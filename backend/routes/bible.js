// routes/bible.js
import express from 'express';
import axios from 'axios';

const router = express.Router();
const NIV_BIBLE_ID = '06125adad2d5898a-01';

const apiTranslations = {
  NIV: {
    id: NIV_BIBLE_ID,
    source: 'api.bible',
  },
};

export default function bibleRoutes(bibles) {
  router.get('/api/bible', async (req, res) => {
    const { translation = 'asv', book, chapter } = req.query;
    console.log(`📖 GET /api/bible → translation=${translation}, book=${book}, chapter=${chapter}`);

    if (!book || !chapter) {
      console.warn('⚠️ Missing book or chapter parameter in request');
      return res.status(400).json({ error: 'Missing book or chapter parameter' });
    }

    const upperTranslation = translation.toUpperCase();

    // ✅ Handle external API translations
    if (apiTranslations[upperTranslation]) {
      const { id, source } = apiTranslations[upperTranslation];
      console.log(`🌐 Fetching ${translation} via ${source}...`);

      try {
        const response = await axios.get(
          `https://api.scripture.api.bible/v1/bibles/${id}/passages`,
          {
            headers: { 'api-key': process.env.BIBLE_API_KEY },
            params: {
              passage: `${book} ${chapter}`,
              contentType: 'html',
              includeFootnotes: false,
              includeHeadings: false,
            },
          }
        );

        const html = response.data?.data?.content;
        if (!html) {
          console.warn('🚫 No HTML content returned from API.');
          return res.status(404).json({ error: 'No content found for this passage.' });
        }

        console.log(`✅ API.Bible responded with content for ${translation} ${book} ${chapter}`);
        return res.json({ source, content: html });
      } catch (error) {
        console.error(`❌ Error fetching ${translation} from API:`);

        if (error.response) {
          console.error('📉 Status:', error.response.status);
          console.error('📨 Headers:', error.response.headers);
          console.error('📦 Data:', error.response.data);
        } else if (error.request) {
          console.error('📡 No response received:', error.request);
        } else {
          console.error('🛑 Error message:', error.message);
        }

        return res.status(500).json({ error: `Failed to fetch ${translation} from external API.` });
      }
    }

    // ✅ Handle local JSON-based translations
    const bibleData = bibles[translation.toLowerCase()];
    if (!bibleData || !Array.isArray(bibleData.verses)) {
      console.warn(`⚠️ Local translation not found: ${translation}`);
      return res.status(404).json({ error: 'Translation not found' });
    }

    console.log(`🔍 Filtering verses for ${translation} from JSON`);
    const verses = bibleData.verses.filter(
      v => v.book_name.toLowerCase() === book.toLowerCase() && String(v.chapter) === String(chapter)
    );

    if (!verses.length) {
      console.warn(`🚫 No verses found for ${translation} ${book} ${chapter}`);
      return res.status(404).json({ error: 'No verses found for this selection.' });
    }

    console.log(`✅ Found ${verses.length} verses for ${translation} ${book} ${chapter}`);
    res.json({ source: 'local', verses });
  });

  return router;
}
