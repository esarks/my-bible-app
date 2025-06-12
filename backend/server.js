import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioFromNumber = process.env.TWILIO_PHONE_NUMBER;

const verificationCodes = new Map();

// ✅ Preload all Bible files into memory with logging
const bibles = {};
const biblesDir = path.join(__dirname, 'data', 'bibles');
console.log(`📦 Loading Bible files from ${biblesDir}`);

fs.readdirSync(biblesDir).forEach(file => {
  if (file.endsWith('.json')) {
    const translationKey = file.replace('.json', '').toLowerCase();
    const filePath = path.join(biblesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      bibles[translationKey] = data;
      const books = [...new Set(data.verses.map(v => v.book_name))];
      console.log(`✅ Loaded Bible: ${translationKey} with ${books.length} books`);
    } catch (error) {
      console.error(`❌ Error loading ${file}:`, error);
    }
  }
});

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
  console.log(`📨 Requesting verification code for: ${phoneNumber}`);
  if (!phoneNumber) return res.status(400).json({ success: false, message: 'Missing phoneNumber' });

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
  console.log(`🔍 Verifying code for ${phoneNumber}`);
  const record = verificationCodes.get(phoneNumber);

  if (!record) return res.json({ success: false, message: 'No verification code sent' });
  if (record.expiresAt < Date.now()) {
    verificationCodes.delete(phoneNumber);
    return res.json({ success: false, message: 'Code expired' });
  }
  if (record.code !== code) return res.json({ success: false, message: 'Incorrect code' });

  verificationCodes.delete(phoneNumber);
  console.log(`✅ Verified phone number: ${phoneNumber}`);
  res.json({ success: true, phoneNumber });
});

// ✅ Fetch User Profile
app.get('/api/user-profile', async (req, res) => {
  const phoneNumber = req.query.phoneNumber;
  console.log(`📥 GET /api/user-profile for phoneNumber=${phoneNumber}`);

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Missing phoneNumber' });
  }

  try {
    const profile = await prisma.userProfile.findUnique({ where: { phoneNumber } });

    if (!profile) {
      console.log(`⚠️ No user profile found for ${phoneNumber}`);
      return res.json({ success: true, profile: { phoneNumber, name: '', email: '', emailVerified: false } });
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

// ✅ Bible Verse Lookup Endpoint (Memory-based)
app.get('/api/bible', (req, res) => {
  const { translation = 'asv', book, chapter } = req.query;
  console.log(`📖 Bible request: translation=${translation}, book=${book}, chapter=${chapter}`);

  if (!book || !chapter) {
    console.warn('⚠️ Missing book or chapter parameter');
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  const bibleData = bibles[translation.toLowerCase()];
  if (!bibleData || !bibleData.verses) {
    console.warn(`⚠️ Translation '${translation}' not found or has no verses loaded.`);
    return res.status(404).json({ error: 'Translation not found or data not loaded.' });
  }

  const verses = bibleData.verses.filter(
    (v) =>
      v.book_name.toLowerCase() === book.toLowerCase() &&
      String(v.chapter) === String(chapter)
  );

  if (verses.length === 0) {
    console.warn(`⚠️ No verses found for ${translation} ${book} ${chapter}`);
    return res.status(404).json({ error: 'No verses found for this selection.' });
  }

  console.log(`✅ Returning ${verses.length} verses for ${translation} ${book} ${chapter}`);
  res.json({ verses });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`🚀 Auth and Bible server running on port ${port}`);
});
