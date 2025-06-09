const express = require('express');
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const cors = require('cors');

const app = express();
app.use(cors());

// Load ASV Bible data at startup
let asvBibleData;
const asvFilePath = path.join(__dirname, '.data/bibles/asv.json');
try {
  const rawData = fs.readFileSync(asvFilePath, 'utf8');
  asvBibleData = JSON.parse(rawData);
  logger.info('ASV Bible data loaded successfully.');
} catch (error) {
  logger.error('Error loading ASV Bible data:', error);
}

// Middleware to log all incoming requests
app.use((req, res, next) => {
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    query: req.query,
    ip: req.ip,
  });
  next();
});

// Root endpoint
app.get('/', (req, res) => {
  logger.info('Root endpoint hit');
  res.send('Hello from my-bible-api!');
});

// Dummy endpoint (left as-is)
app.get('/bible/chapter', (req, res) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    logger.warn('Missing book or chapter in /bible/chapter', { query: req.query });
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  logger.info('/bible/chapter accessed', { book, chapter });

  res.json({
    book,
    chapter,
    text: 'This is a mock text for demonstration.',
  });
});

// Real /api/bible endpoint using asv.json
app.get('/api/bible', (req, res) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    logger.warn('Missing book or chapter in /api/bible', { query: req.query });
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  if (!asvBibleData || !asvBibleData.verses) {
    logger.error('ASV Bible data not loaded.');
    return res.status(500).json({ error: 'Bible data not loaded.' });
  }

  // Find matching verses
  const verses = asvBibleData.verses.filter(
    (v) =>
      v.book_name.toLowerCase() === book.toLowerCase() &&
      String(v.chapter) === String(chapter)
  );

  if (verses.length === 0) {
    logger.warn('No verses found.', { book, chapter });
    return res.status(404).json({ error: 'No verses found for this selection.' });
  }

  logger.info(`/api/bible returning verses`, { book, chapter, count: verses.length });
  res.json({ verses });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
