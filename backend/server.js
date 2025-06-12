import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioFromNumber = process.env.TWILIO_PHONE_NUMBER;

const verificationCodes = new Map();

// ✅ DB Connect with Retry Logic
const connectWithRetry = async (retries = 30, delay = 5000) => {
  try {
    console.log('🔍 DATABASE_URL:', process.env.DATABASE_URL);
    await prisma.$connect();
    console.log('✅ Connected to Postgres');
  } catch (error) {
    if (retries === 0) {
      console.error('❌ Could not connect to DB:', error);
      process.exit(1);
    } else {
      console.warn(`⚠️ Retry DB connection in ${delay / 1000}s... (${retries} retries left)`);
      setTimeout(() => connectWithRetry(retries - 1, delay), delay);
    }
  }
};

connectWithRetry();

// ✅ Request Verification Code
app.post('/api/auth/request-code', async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    console.error('❌ Missing phoneNumber');
    return res.status(400).json({ success: false, message: 'Missing phoneNumber' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 300_000;
  verificationCodes.set(phoneNumber, { code, expiresAt });

  try {
    await twilioClient.messages.create({
      body: `Your verification code is: ${code}`,
      from: twilioFromNumber,
      to: phoneNumber,
    });
    console.log(`✅ Sent verification code ${code} to ${phoneNumber}`);
    res.json({ success: true });
  } catch (error) {
    console.error('❌ Twilio error:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS' });
  }
});

// ✅ Verify Code
app.post('/api/auth/verify-code', (req, res) => {
  const { phoneNumber, code } = req.body;
  const record = verificationCodes.get(phoneNumber);

  if (!record) {
    return res.json({ success: false, message: 'No verification code sent' });
  }

  if (record.expiresAt < Date.now()) {
    verificationCodes.delete(phoneNumber);
    return res.json({ success: false, message: 'Code expired' });
  }

  if (record.code !== code) {
    return res.json({ success: false, message: 'Incorrect code' });
  }

  verificationCodes.delete(phoneNumber);
  console.log(`✅ Verified phone number: ${phoneNumber}`);
  res.json({ success: true, phoneNumber });
});

// ✅ Fetch User Profile
app.get('/api/user-profile', async (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  console.log('📥 GET /api/user-profile?phoneNumber=' + phoneNumber);

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Missing phoneNumber' });
  }

  try {
    const profile = await prisma.userProfile.findUnique({ where: { phoneNumber } });

    if (!profile) {
      console.log('⚠️ No user profile found for', phoneNumber);
      return res.json({
        success: true,
        profile: { phoneNumber, name: '', email: '', emailVerified: false }
      });
    }

    console.log('✅ Loaded user profile:', profile);
    res.json({ success: true, profile });
  } catch (error) {
    console.error('❌ Error loading profile:', error);
    res.status(500).json({ success: false, error: 'Failed to load profile' });
  }
});

// ✅ Save or Update Profile
app.post('/api/user-profile', async (req, res) => {
  const { phoneNumber, name, email } = req.body;
  console.log('📥 POST /api/user-profile:', req.body);

  if (!phoneNumber || !name || !email) {
    return res.status(400).json({ success: false, error: 'Missing phoneNumber, name, or email' });
  }

  try {
    let profile = await prisma.userProfile.findUnique({ where: { phoneNumber } });

    if (profile) {
      profile = await prisma.userProfile.update({
        where: { phoneNumber },
        data: { name, email },
      });
      console.log('✅ Updated profile:', profile);
    } else {
      profile = await prisma.userProfile.create({
        data: { phoneNumber, name, email },
      });
      console.log('✅ Created profile:', profile);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('❌ Error saving profile:', error);
    res.status(500).json({ success: false, error: 'Failed to save profile' });
  }
});

// ✅ Fetch Bible Chapter
app.get('/api/bible', (req, res) => {
  const { translation, book, chapter } = req.query;

  if (!translation || !book || !chapter) {
    return res.status(400).json({ error: 'Missing translation, book, or chapter' });
  }

  const filePath = path.join(
    __dirname,
    'data',
    'bibles',
    translation.toUpperCase(),
    book,
    `${chapter}.json`
  );

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`❌ Could not find chapter file at ${filePath}`);
      return res.status(404).json({ error: 'Chapter not found' });
    }

    try {
      const verses = JSON.parse(data);
      res.json({ verses });
    } catch (parseError) {
      console.error('❌ JSON parse error:', parseError);
      res.status(500).json({ error: 'Failed to parse chapter JSON' });
    }
  });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Auth and Bible server running on port ${port}`);
});
