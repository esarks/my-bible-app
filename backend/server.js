const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const cors = require('cors');

const app = express();
app.use(cors());

// ✅ Load all Bible JSON files at startup
const bibles = {};
const biblesDir = path.join(__dirname, '.data/bibles');

fs.readdirSync(biblesDir).forEach(file => {
  if (file.endsWith('.json')) {
    const translationKey = file.replace('.json', '').toLowerCase();
    const filePath = path.join(biblesDir, file);
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      bibles[translationKey] = data;
      logger.info(`Loaded Bible: ${translationKey}`);
    } catch (error) {
      logger.error(`Error loading ${file}:`, error);
    }
  }
});

// ✅ Log all incoming requests
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    query: req.query,
    ip: req.ip,
  });
  next();
});

// ✅ Root endpoint
app.get('/', (req, res) => {
  res.send('Hello from my-bible-api!');
});

// ✅ Dummy endpoint
app.get('/bible/chapter', (req, res) => {
  const { book, chapter } = req.query;
  if (!book || !chapter) {
    logger.warn('Missing book or chapter', { query: req.query });
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }
  logger.info('/bible/chapter dummy accessed', { book, chapter });
  res.json({ book, chapter, text: 'This is a mock text for demonstration.' });
});

// ✅ Real /api/bible endpoint
app.get('/api/bible', (req, res) => {
  const { translation = 'asv', book, chapter } = req.query;

  if (!book || !chapter) {
    logger.warn('Missing book or chapter', { query: req.query });
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  const bibleData = bibles[translation.toLowerCase()];
  if (!bibleData || !bibleData.verses) {
    logger.warn('Translation not found or data not loaded', { translation });
    return res.status(404).json({ error: 'Translation not found or data not loaded.' });
  }

  const verses = bibleData.verses.filter(
    (v) =>
      v.book_name.toLowerCase() === book.toLowerCase() &&
      String(v.chapter) === String(chapter)
  );

  if (verses.length === 0) {
    logger.warn('No verses found', { translation, book, chapter });
    return res.status(404).json({ error: 'No verses found for this selection.' });
  }

  logger.info('/api/bible returning verses', { translation, book, chapter, count: verses.length });
  res.json({ verses });
});

// ✅ Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
