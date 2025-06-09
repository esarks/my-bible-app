const express = require('express');
const app = express();

// Existing root endpoint
app.get('/', (req, res) => {
  res.send('Hello from my-bible-api!');
});

// 🟩 New /bible/chapter endpoint
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

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
