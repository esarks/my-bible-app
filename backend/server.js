const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// New endpoint: GET /api/chapter?book=John&chapter=1
app.get('/api/chapter', (req, res) => {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    return res.status(400).json({ error: 'Missing book or chapter' });
  }

  // Mock data file: ./data/john_1.json
  const filePath = path.join(__dirname, 'data', `${book.toLowerCase()}_${chapter}.json`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Chapter not found' });
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(data);
});

// Health check
app.get('/', (req, res) => {
  res.send('Hello from my-bible-api!');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
