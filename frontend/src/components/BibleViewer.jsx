import React, { useState, useEffect } from 'react';
import BibleSelector from './BibleSelector';
import { fetchVerses, loadNote } from '../api';
import NotesEditor from './NotesEditor';
import { PencilIcon } from '@heroicons/react/24/solid';

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

const chapterCounts = {
  Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
  Joshua: 24, Judges: 21, Ruth: 4, '1 Samuel': 31, '2 Samuel': 24,
  '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
  Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
  Ecclesiastes: 12, 'Song of Solomon': 8, Isaiah: 66, Jeremiah: 52, Lamentations: 5,
  Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1,
  Jonah: 4, Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3,
  Haggai: 2, Zechariah: 14, Malachi: 4,
  Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28,
  Romans: 16, '1 Corinthians': 16, '2 Corinthians': 13, Galatians: 6,
  Ephesians: 6, Philippians: 4, Colossians: 4, '1 Thessalonians': 5,
  '2 Thessalonians': 3, '1 Timothy': 6, '2 Timothy': 4, Titus: 3,
  Philemon: 1, Hebrews: 13, James: 5, '1 Peter': 5, '2 Peter': 3,
  '1 John': 5, '2 John': 1, '3 John': 1, Jude: 1, Revelation: 22
};

export default function BibleViewer() {
  const [translation, setTranslation] = useState('ASV');
  const [book, setBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [chapter, setChapter] = useState('');
  const [verses, setVerses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [noteTarget, setNoteTarget] = useState(null);
  const [notes, setNotes] = useState({});

  useEffect(() => {
    if (book && chapterCounts[book]) {
      const count = chapterCounts[book];
      setChapters(Array.from({ length: count }, (_, i) => i + 1));
      setChapter('');
      setVerses([]);
    } else {
      setChapters([]);
      setChapter('');
    }
  }, [book]);

  const handleFetch = async () => {
    if (!translation || !book || !chapter) {
      setError('Please select translation, book, and chapter.');
      return;
    }
    setLoading(true);
    setError('');
    setVerses([]);
    setNotes({});

    try {
      const data = await fetchVerses(translation, book, chapter);
      const allNotes = {};
      for (const v of data.verses) {
        const n = await loadNote({ book, chapter: parseInt(chapter), verse: v.verse });
        if (n?.content) allNotes[v.verse] = n.content;
      }
      setVerses(data.verses || []);
      setNotes(allNotes);
    } catch (err) {
      console.error('Error fetching verses:', err);
      setError('Failed to load content.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4 text-center">📖 Bible Viewer</h1>

      <BibleSelector selected={translation} onChange={setTranslation} />

      <div className="my-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
        <select
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="w-full p-2 border rounded shadow-sm text-sm"
        >
          <option value="">Select a book</option>
          {books.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {chapters.length > 0 && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="w-full p-2 border rounded shadow-sm text-sm"
          >
            <option value="">Select a chapter</option>
            {chapters.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleFetch}
        disabled={!translation || !book || !chapter}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-50"
      >
        View Chapter
      </button>

      {loading && <p className="text-blue-600 mt-4">⏳ Loading...</p>}
      {error && <p className="text-red-600 mt-4">❌ {error}</p>}

      {verses.length > 0 && (
        <div className="bg-white p-4 border rounded shadow mt-4 text-left">
          <h3 className="font-semibold mb-2">{translation} - {book} {chapter}</h3>
          {verses.map((v, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-start">
                <p><strong>{v.verse}.</strong> {v.text}</p>
                <button
                  onClick={() => setNoteTarget({ book, chapter: parseInt(chapter), verse: v.verse })}
                  className="text-blue-500 hover:text-blue-700 ml-2"
                  title={`Add/edit note for verse ${v.verse}`}
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
              </div>
              {notes[v.verse] && (
                <p className="text-sm text-gray-600 italic mt-1 ml-4">📝 {notes[v.verse]}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {noteTarget && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded shadow-lg p-4 w-96">
            <NotesEditor
              reference={noteTarget}
              onClose={() => setNoteTarget(null)}
              onSave={handleFetch}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setNoteTarget(null)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
