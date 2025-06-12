// routes/bible.js
import express from 'express';
import axios from 'axios';

const router = express.Router();
const NIV_BIBLE_ID = '06125adad2d5898a-01';

export default function bibleRoutes(bibles) {
  router.get('/api/bible', async (req, res) => {
    const { translation = 'asv', book, chapter } = req.query;
    console.log(`📖 GET /api/bible → translation=${translation}, book=${book}, chapter=${chapter}`);

    if (!book || !chapter) {
      console.warn('⚠️ Missing book or chapter parameter in request');
      return res.status(400).json({ error: 'Missing book or chapter parameter' });
    }

    // 🪄 Handle NIV via external API
    if (translation.toUpperCase() === 'NIV') {
      console.log(`🌐 Using API.Bible to fetch NIV: book=${book}, chapter=${chapter}`);

      try {
        const response = await axios.get(
          `https://api.scripture.api.bible/v1/bibles/${NIV_BIBLE_ID}/passages`,
          {
            headers: { 'api-key': process.env.BIBLE_API_KEY },
            params: { bookId: book, chapter },
          }
        );

        const verses = response.data?.data?.content || response.data;
        console.log(`✅ Successfully fetched NIV ${book} ${chapter} from API.Bible`);
        res.json({ source: 'api.bible', content: verses });
      } catch (error) {
        console.error(`❌ Failed to fetch NIV ${book} ${chapter}:`, error.message);
        res.status(500).json({ error: 'Failed to fetch NIV from external API.' });
      }

      return;
    }

    // 📚 Handle local JSON Bible translations
    const key = translation.toLowerCase();
    const bibleData = bibles[key];

    if (!bibleData || !Array.isArray(bibleData.verses)) {
      console.warn(`⚠️ Translation not found or invalid: ${translation}`);
      return res.status(404).json({ error: 'Translation not found' });
    }

    console.log(`🔍 Searching local translation: ${translation} for ${book} ${chapter}`);
    const verses = bibleData.verses.filter(
      v => v.book_name.toLowerCase() === book.toLowerCase() && String(v.chapter) === String(chapter)
    );

    if (!verses.length) {
      console.warn(`🚫 No verses found for ${translation} ${book} ${chapter}`);
      return res.status(404).json({ error: 'No verses found for this selection.' });
    }

    console.log(`✅ Found ${verses.length} verses for ${translation} ${book} ${chapter}`);
    res.json({ verses });
  });

  return router;
}
