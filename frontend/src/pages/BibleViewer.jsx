// frontend/src/components/BibleViewer.jsx
import React, { useState, useEffect } from 'react';
import BibleSelector from './BibleSelector';

const books = [
  'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
  'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
  '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
  'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
  'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations',
  'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
  'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
  'Haggai', 'Zechariah', 'Malachi',
  'Matthew', 'Mark', 'Luke', 'John', 'Acts',
  'Romans', '1 Corinthians', '2 Corinthians', 'Galatians',
  'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians',
  '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus',
  'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
  '1 John', '2 John', '3 John', 'Jude', 'Revelation'
];

export default function BibleViewer() {
  const [translation, setTranslation] = useState('ASV');
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState(1);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!book || !chapter) return;

    const fetchVerses = async () => {
      setLoading(true);
      setContent(null);

      try {
        const response = await fetch(
          `/api/bible?translation=${translation}&book=${encodeURIComponent(book)}&chapter=${chapter}`
        );

        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error('Error fetching Bible content:', error);
        setContent({ error: 'Failed to load content.' });
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [translation, book, chapter]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">📖 Bible Viewer</h1>

      <BibleSelector selected={translation} onChange={setTranslation} />

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Book
        </label>
        <select
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="w-full p-2 border rounded shadow-sm text-sm"
        >
          {books.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Chapter
        </label>
        <input
          type="number"
          min="1"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full p-2 border rounded shadow-sm text-sm"
        />
      </div>

      {loading && <p className="text-blue-600">⏳ Loading...</p>}

      {content?.error && (
        <p className="text-red-600">❌ {content.error}</p>
      )}

      {content?.verses && (
        <div className="bg-white p-4 border rounded shadow">
          {content.verses.map((v, i) => (
            <p key={i}>
              <strong>{v.verse}.</strong> {v.text}
            </p>
          ))}
        </div>
      )}

      {content?.content && (
        <div
          className="bg-white p-4 border rounded shadow"
          dangerouslySetInnerHTML={{ __html: content.content }}
        />
      )}
    </div>
  );
}
