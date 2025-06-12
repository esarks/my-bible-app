// routes/auth.js
import express from 'express';

const router = express.Router();
const verificationCodes = new Map();

export default function authRoutes(twilioClient, twilioFromNumber) {
  router.post('/api/auth/request-code', async (req, res) => {
    const { phoneNumber } = req.body;
    console.log(`📥 Received request for verification code to ${phoneNumber}`);

    if (!phoneNumber) {
      console.warn('⚠️ Missing phoneNumber in request');
      return res.status(400).json({ success: false, message: 'Missing phoneNumber' });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 300_000; // 5 minutes from now
    verificationCodes.set(phoneNumber, { code, expiresAt });

    // ✅ Log the generated code (for dev/debug only)
    console.log(`✅ Generated code ${code} for ${phoneNumber} (expires in 5 minutes)`);

    try {
      await twilioClient.messages.create({
        body: `Your verification code is: ${code}`,
        from: twilioFromNumber,
        to: phoneNumber,
      });
      console.log(`📤 Sent verification code to ${phoneNumber} via Twilio`);
      res.json({ success: true });
    } catch (error) {
      console.error('❌ Twilio send error:', error.message);
      res.status(500).json({ success: false, message: 'Failed to send SMS' });
    }
  });

  router.post('/api/auth/verify-code', (req, res) => {
    const { phoneNumber, code } = req.body;
    console.log(`🔍 Verifying code for ${phoneNumber}: received code ${code}`);

    const record = verificationCodes.get(phoneNumber);

    if (!record) {
      console.warn(`⚠️ No code on file for ${phoneNumber}`);
      return res.json({ success: false, message: 'No verification code sent' });
    }

    if (record.expiresAt < Date.now()) {
      console.warn(`⌛ Code expired for ${phoneNumber}`);
      verificationCodes.delete(phoneNumber);
      return res.json({ success: false, message: 'Code expired' });
    }

    if (record.code !== code) {
      console.warn(`❌ Incorrect code for ${phoneNumber}. Expected: ${record.code}, Received: ${code}`);
      return res.json({ success: false, message: 'Incorrect code' });
    }

    console.log(`✅ Verified code for ${phoneNumber}`);
    verificationCodes.delete(phoneNumber);
    res.json({ success: true, phoneNumber });
  });

  return router;
}
