import React, { useState, useEffect } from 'react';
import BiblePassageSelector from '../components/BiblePassageSelector';
import NotesEditor from '../components/NotesEditor';
import { fetchVerses, loadNote } from '../api';
import { PencilIcon } from '@heroicons/react/24/solid';
import { books, chapterCounts } from '../constants/Constants';

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

  const loginId = localStorage.getItem('loginId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

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

    if (!loginId) {
      setError('User not logged in. Please log in to use notes.');
      return;
    }

    setLoading(true);
    setError('');
    setVerses([]);
    setNotes({});

    try {
      const data = await fetchVerses(translation, book, chapter);
      const allNotes = {};

      const bookNote = await loadNote({ loginId, book });
      if (bookNote?.content) allNotes['book'] = bookNote.content;

      const chapterNote = await loadNote({ loginId, book, chapter: parseInt(chapter) });
      if (chapterNote?.content) allNotes['chapter'] = chapterNote.content;

      for (const v of data.verses) {
        const n = await loadNote({ loginId, book, chapter: parseInt(chapter), verse: v.verse });
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

      <div className="bg-gray-100 p-3 mb-4 rounded shadow text-sm text-gray-800">
        <p><strong>Logged in as:</strong> {userName || 'Unknown User'}</p>
        <p><strong>Email:</strong> {userEmail || 'N/A'}</p>
        <p><strong>Login ID:</strong> {loginId || 'Not Set'}</p>
      </div>

      <BiblePassageSelector
        translation={translation}
        book={book}
        chapter={chapter}
        chapters={chapters}
        books={books}
        onTranslationChange={setTranslation}
        onBookChange={(e) => setBook(e.target.value)}
        onChapterChange={(e) => setChapter(e.target.value)}
        onViewClick={handleFetch}
      />

      {loading && <p className="text-blue-600 mt-4">⏳ Loading...</p>}
      {error && <p className="text-red-600 mt-4">❌ {error}</p>}

      {verses.length > 0 && (
        <div className="bg-white p-4 border rounded shadow mt-4 text-left">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">{translation} - {book} {chapter}</h3>
            <div className="space-x-2">
              <button
                onClick={() => setNoteTarget({ loginId, book })}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300"
              >
                📘 Book Note
              </button>
              <button
                onClick={() => setNoteTarget({ loginId, book, chapter: parseInt(chapter) })}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm hover:bg-gray-300"
              >
                📄 Chapter Note
              </button>
            </div>
          </div>

          {notes['book'] && (
            <p className="text-sm text-purple-700 italic mb-2 ml-4">📘 Book Note: {notes['book']}</p>
          )}
          {notes['chapter'] && (
            <p className="text-sm text-indigo-700 italic mb-4 ml-4">📄 Chapter Note: {notes['chapter']}</p>
          )}

          {verses.map((v, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-start">
                <p><strong>{v.verse}.</strong> {v.text}</p>
                <button
                  onClick={() =>
                    setNoteTarget({ loginId, book, chapter: parseInt(chapter), verse: v.verse })
                  }
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
