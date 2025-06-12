// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import twilio from 'twilio';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';

// Route imports
import bibleRoutes from './routes/bible.js';
import authRoutes from './routes/auth.js';
import userProfileRoutes from './routes/userProfile.js';
import { loadBibles } from './utils/preloadBibles.js';

process.stdout.write = process.stdout.write.bind(process.stdout);

console.log('******************************************************************** Start');

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

// Preload Bible files
const biblesDir = path.join(__dirname, 'data', 'bibles');
const bibles = loadBibles(biblesDir);

// Retry DB Connection
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

// Register routes
app.use(bibleRoutes(bibles));
app.use(authRoutes(twilioClient, twilioFromNumber));
app.use(userProfileRoutes(prisma));

// Start server
app.listen(port, () => {
  console.log(`🚀 Auth and Bible server running on port ${port}`);
});
