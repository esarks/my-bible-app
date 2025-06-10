import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const twilioFromNumber = process.env.TWILIO_PHONE_NUMBER;

// Temporary in-memory store for verification codes
const verificationCodes = new Map();

app.post('/api/auth/request-code', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, message: 'Missing phoneNumber' });
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 300_000; // 5 min validity

  verificationCodes.set(phoneNumber, { code, expiresAt });

  try {
    await twilioClient.messages.create({
      body: `Your verification code is: ${code}`,
      from: twilioFromNumber,
      to: phoneNumber,
    });
    console.log(`Sent code ${code} to ${phoneNumber}`);
    res.json({ success: true });
  } catch (error) {
    console.error('Twilio error:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS' });
  }
});

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
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Auth server running on port ${port}`);
});
