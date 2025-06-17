import { useState, useEffect } from 'react';
import BibleViewerPage from '../pages/BibleViewerPage';
import SimpleVerseListViewerPage from '../pages/SimpleVerseListViewerPage';
import NoteEditor from '../components/NoteEditor';
import { loadNote } from '../api';

// Inline verse fetcher
async function fetchVersesFromBackend(translation, book, chapter) {
  const res = await fetch(`/api/bible?translation=${translation}&book=${book}&chapter=${chapter}`);
  const data = await res.json();
  return data.verses || [];
}

const viewerOptions = [
  { key: 'bible', label: '📖 Bible Viewer', component: BibleViewerPage },
  { key: 'simple', label: '📜 Simple Verse List Viewer', component: SimpleVerseListViewerPage },
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

  const handleNoteClick = (verseInfo) => {
    setSelectedVerse(verseInfo);
    setShowEditor(true);
  };

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedVerse(null);
  };

  const handleEditorSave = () => {
    setShowEditor(false);
    setSelectedVerse(null);
    handleViewClick();
  };

  const handleChange = (field, value) => {
    if (field === 'translation') setTranslation(value);
    if (field === 'book') setBook(value);
    if (field === 'chapter') setChapter(value);
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

      {selectedViewer?.component && (
        <selectedViewer.component
          user={user}
          userId={user?.loginId}
          translation={translation}
          book={book}
          chapter={chapter}
          books={books}
          chapters={chapters}
          verses={verses}
          notes={notes}
          selectedVerse={selectedVerse}
          showEditor={showEditor}
          onChange={handleChange}
          onViewClick={handleViewClick}
          onNoteClick={handleNoteClick}
          onEditorClose={handleEditorClose}
          onEditorSave={handleEditorSave}
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
