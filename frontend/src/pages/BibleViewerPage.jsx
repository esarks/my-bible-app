import { useState, useEffect } from 'react';
import BibleViewer from '../pages/BibleViewerPage';
import SimpleVerseListViewer from '../viewers/SimpleVerseListViewer';
import ViewerControls from '../components/ViewerControls'; // ✅ Add shared controls
import { fetchVersesFromBackend } from '../utils/fetchVerses';
import NoteEditor from '../components/NoteEditor';
import { loadNote } from '../api';
import { books as allBooks, chapterCounts } from '../constants';

const viewerOptions = [
  { key: 'bible', label: '📖 Bible Viewer', component: BibleViewer },
  { key: 'simple', label: '📜 Simple Verse List Viewer', component: SimpleVerseListViewer },
];

export default function ViewerShell({ user }) {
  const [selectedKey, setSelectedKey] = useState('bible');
  const [translation, setTranslation] = useState('ASV');
  const [book, setBook] = useState('Genesis');
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const selectedViewer = viewerOptions.find((v) => v.key === selectedKey);

  useEffect(() => {
    if (book && chapterCounts[book]) {
      const count = chapterCounts[book];
      setChapters(Array.from({ length: count }, (_, i) => i + 1));
    }
  }, [book]);

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
    handleViewClick();
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

      <ViewerControls
        user={user}
        translation={translation}
        book={book}
        chapter={chapter}
        books={allBooks}
        chapters={chapters}
        onTranslationChange={(e) => setTranslation(e.target.value)}
        onBookChange={(e) => setBook(e.target.value)}
        onChapterChange={(e) => setChapter(Number(e.target.value))}
        onViewClick={handleViewClick}
      />

      {selectedViewer?.component && (
        <selectedViewer.component
          user={user}
          translation={translation}
          book={book}
          chapter={chapter}
          verses={verses}
          notes={notes}
          onNoteClick={handleNoteClick}
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
