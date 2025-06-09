const express = require('express');
const logger = require('./logger');
const app = express();

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

// Existing root endpoint
app.get('/', (req, res) => {
  logger.info('Root endpoint hit');
  res.send('Hello from my-bible-api!');
});

// Existing /bible/chapter endpoint
app.get('/bible/chapter', (req, res) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    logger.warn('Missing book or chapter in /bible/chapter', { query: req.query });
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  logger.info('/bible/chapter accessed', { book, chapter });

  // Mocked response for demonstration
  res.json({
    book,
    chapter,
    text: 'This is a mock text for demonstration.',
  });
});

// New /api/bible endpoint
app.get('/api/bible', (req, res) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    logger.warn('Missing book or chapter in /api/bible', { query: req.query });
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  logger.info('/api/bible accessed', { book, chapter });

  // Example dummy verses
  const dummyVerses = {
    Genesis: {
      1: [
        'In the beginning God created the heavens and the earth.',
        'Now the earth was formless and empty...',
      ],
      2: ['Thus the heavens and the earth were completed...'],
    },
    Exodus: {
      1: ['These are the names of the sons of Israel who went to Egypt...'],
    },
  };

  const verses =
    dummyVerses[book] && dummyVerses[book][chapter]
      ? dummyVerses[book][chapter]
      : ['No verses found for this selection.'];

  res.json({ verses });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
