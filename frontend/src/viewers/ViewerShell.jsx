import { useState, useEffect } from 'react';
import BibleViewer from '../pages/BibleViewerPage';
import SimpleVerseListViewer from '../viewers/SimpleVerseListViewer';
import { fetchVersesFromBackend } from '../utils/fetchVerses';
import NoteEditor from '../components/NoteEditor'; // ✅ Add this
import { loadNote } from '../api'; // ✅ Reuse your existing note loader

const viewerOptions = [
  { key: 'bible', label: '📖 Bible Viewer', component: BibleViewer },
  { key: 'simple', label: '📜 Simple Verse List Viewer', component: SimpleVerseListViewer },
];

export default function ViewerShell({ user }) {
  const [selectedKey, setSelectedKey] = useState('bible');
  const [translation, setTranslation] = useState('ASV');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [verses, setVerses] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const selectedViewer = viewerOptions.find((v) => v.key === selectedKey);

  useEffect(() => {
    if (translation) {
      fetch(`/api/books?translation=${translation}`)
        .then(res => res.json())
        .then(data => setBooks(data.books || []));
    }
  }, [translation]);

  useEffect(() => {
    if (book) {
      fetch(`/api/chapters?translation=${translation}&book=${book}`)
        .then(res => res.json())
        .then(data => setChapters(data.chapters || []));
    }
  }, [book, translation]);

  const handleViewClick = async () => {
    if (!user?.loginId || !book || !chapter) return;

    const fetched = await fetchVersesFromBackend(translation, book, chapter);
    const allNotes = {};

    for (const verse of fetched) {
      const note = await loadNote({
        loginId: user.loginId,
        book,
        chapter,
        verse: verse.verse,
      });
      if (note?.content) {
        allNotes[verse.verse] = note.content;
      }
    }

    setVerses(fetched);
    setNotes(allNotes);
  };

  const handleNoteClick = (verseNum) => {
    setSelectedVerse({ book, chapter, verse: verseNum });
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedVerse(null);
  };

  const handleEditorSave = () => {
    setShowEditor(false);
    setSelectedVerse(null);
    handleViewClick(); // Reload notes
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mr-2 font-semibold">Choose Viewer:</label>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {viewerOptions.map((v) => (
            <option key={v.key} value={v.key}>{v.label}</option>
          ))}
        </select>
      </div>

      <div className="space-x-2">
        <select value={translation} onChange={(e) => setTranslation(e.target.value)}>
          <option value="ASV">ASV</option>
          <option value="KJV">KJV</option>
        </select>

        <select value={book} onChange={(e) => setBook(e.target.value)}>
          <option value="">Select a book</option>
          {books.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>

        <select value={chapter} onChange={(e) => setChapter(e.target.value)}>
          <option value="">Select a chapter</option>
          {chapters.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button onClick={handleViewClick} className="px-2 py-1 bg-blue-600 text-white rounded">
          View Chapter
        </button>
      </div>

      {selectedViewer?.component && (
        <selectedViewer.component
          user={user}
          translation={translation}
          book={book}
          chapter={chapter}
          verses={verses}
          notes={notes}
          onNoteClick={handleNoteClick} // ✅ Hook up editor
        />
      )}

      {showEditor && selectedVerse && (
        <NoteEditor
          selectedVerse={selectedVerse}
          userId={user?.loginId}
          onClose={handleEditorClose}
          onSave={handleEditorSave}
        />
      )}
    </div>
  );
}
