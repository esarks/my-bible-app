import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioFromNumber = process.env.TWILIO_PHONE_NUMBER;

const verificationCodes = new Map();

// In-memory store for the user profile (can be replaced with a DB)
let userProfile = {
  phoneNumber: '',  // This will be filled in after login
  name: '',
  email: '',
  emailVerified: false
};

// ✅ Phone verification endpoint
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

app.post('/api/auth/verify-code', (req, res) => {
  const { phoneNumber, code } = req.body;
  const record = verificationCodes.get(phoneNumber);

  if (!record) {
    console.error('❌ No verification code sent');
    return res.json({ success: false, message: 'No verification code sent' });
  }

  if (record.expiresAt < Date.now()) {
    verificationCodes.delete(phoneNumber);
    console.error('❌ Verification code expired');
    return res.json({ success: false, message: 'Code expired' });
  }

  if (record.code !== code) {
    console.error('❌ Incorrect verification code');
    return res.json({ success: false, message: 'Incorrect code' });
  }

  verificationCodes.delete(phoneNumber);
  userProfile.phoneNumber = phoneNumber;  // Save phone number to profile
  console.log(`✅ Verification successful for ${phoneNumber}`);
  res.json({ success: true });
});

// ✅ Scripture search endpoint
app.get('/api/bible', (req, res) => {
  const { translation, book, chapter } = req.query;
  console.log('📥 Request received:', { translation, book, chapter });

  if (!translation || !book || !chapter) {
    console.error('❌ Missing query parameters');
    return res.status(400).json({ error: 'Missing required query parameters.' });
  }

  const filePath = path.resolve('data/bibles', `${translation.toLowerCase()}.json`);
  console.log('📂 Using file path:', filePath);

  if (!fs.existsSync(filePath)) {
    console.error(`❌ Translation file not found: ${filePath}`);
    return res.status(404).json({ error: 'Translation not found' });
  }

  try {
    console.log('📦 Reading file...');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    console.log('✅ File read successfully');

    const bibleData = JSON.parse(fileContent);

    if (!bibleData.verses || !Array.isArray(bibleData.verses)) {
      console.error('❌ No verses array found in file');
      return res.status(500).json({ error: 'Invalid Bible file format' });
    }

    console.log(`🔎 Searching for verses in book='${book}', chapter=${chapter}`);
    const verses = bibleData.verses
      .filter(
        v =>
          v.book_name.toLowerCase() === book.toLowerCase() &&
          v.chapter.toString() === chapter.toString()
      )
      .map(v => ({
        verse: v.verse.toString(),
        text: v.text
      }));

    console.log(`🔎 Found ${verses.length} verses`);

    if (verses.length === 0) {
      console.error(`❌ No verses found for ${book} ${chapter}`);
      return res.status(404).json({
        error: `Chapter '${chapter}' not found in book '${book}'.`
      });
    }

    console.log(`✅ Returning ${verses.length} verses`);
    res.json({
      translation,
      book,
      chapter,
      verses
    });
  } catch (error) {
    console.error('❌ Error reading Bible data:', error);
    res.status(500).json({ error: 'Failed to load verses.' });
  }
});

// ✅ User profile endpoints
app.get('/api/user-profile', (req, res) => {
  console.log('📥 User profile requested');
  res.json({ success: true, profile: userProfile });
});

app.post('/api/user-profile', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    console.error('❌ Missing name or email');
    return res.status(400).json({ success: false, error: 'Missing name or email' });
  }

  userProfile.name = name;
  userProfile.email = email;
  console.log('✅ User profile updated:', userProfile);

  res.json({ success: true });
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Auth and Bible server running on port ${port}`);
});
