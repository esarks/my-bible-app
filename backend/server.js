const express = require('express');
const app = express();

// Existing root endpoint
app.get('/', (req, res) => {
  res.send('Hello from my-bible-api!');
});

// Existing /bible/chapter endpoint
app.get('/bible/chapter', (req, res) => {
  const book = req.query.book;
  const chapter = req.query.chapter;

  if (!book || !chapter) {
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  // For now, return a mocked response
  res.json({
    book,
    chapter,
    text: 'This is a mock text for demonstration.'
  });
});

// 🟩 New /api/bible endpoint to match frontend App.jsx fetch
app.get('/api/bible', (req, res) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    return res.status(400).json({ error: 'Missing book or chapter parameter' });
  }

  // Example dummy verses (replace with real data later!)
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
  console.log(`Server is running on port ${port}`);
});
