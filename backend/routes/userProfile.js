// routes/userProfile.js
import express from 'express';

const router = express.Router();

export default function userProfileRoutes(prisma) {
  router.get('/api/user-profile', async (req, res) => {
    const phoneNumber = req.query.phoneNumber;
    console.log(`📥 GET /api/user-profile requested for phoneNumber=${phoneNumber}`);

    if (!phoneNumber) {
      console.warn('⚠️ phoneNumber missing in query');
      return res.status(400).json({ success: false, error: 'Missing phoneNumber' });
    }

    try {
      const profile = await prisma.userProfile.findUnique({ where: { phoneNumber } });

      if (!profile) {
        console.log(`⚠️ No profile found for ${phoneNumber}. Returning blank profile.`);
        return res.json({
          success: true,
          profile: { phoneNumber, name: '', email: '', emailVerified: false },
        });
      }

      console.log(`✅ Profile loaded for ${phoneNumber}:`, profile);
      res.json({ success: true, profile });
    } catch (error) {
      console.error(`❌ Error loading profile for ${phoneNumber}:`, error);
      res.status(500).json({ success: false, error: 'Failed to load profile' });
    }
  });

  router.post('/api/user-profile', async (req, res) => {
    const { phoneNumber, name, email } = req.body;
    console.log('📥 POST /api/user-profile with payload:', req.body);

    if (!phoneNumber || !name || !email) {
      console.warn('⚠️ Missing required fields:', { phoneNumber, name, email });
      return res.status(400).json({ success: false, error: 'Missing phoneNumber, name, or email' });
    }

    try {
      let profile = await prisma.userProfile.findUnique({ where: { phoneNumber } });

      if (profile) {
        console.log(`🔄 Updating profile for ${phoneNumber}`);
        profile = await prisma.userProfile.update({
          where: { phoneNumber },
          data: { name, email },
        });
        console.log(`✅ Updated profile:`, profile);
      } else {
        console.log(`➕ Creating new profile for ${phoneNumber}`);
        profile = await prisma.userProfile.create({
          data: { phoneNumber, name, email },
        });
        console.log(`✅ Created new profile:`, profile);
      }

      res.json({ success: true });
    } catch (error) {
      console.error(`❌ Error saving profile for ${phoneNumber}:`, error);
      res.status(500).json({ success: false, error: 'Failed to save profile' });
    }
  });

  return router;
}
