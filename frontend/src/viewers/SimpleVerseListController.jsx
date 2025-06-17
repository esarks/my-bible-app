import { useState, useEffect } from 'react';
import { fetchBooks, fetchChapters, fetchVerses } from '../utils/bibleApi';
import ViewerControls from '../components/ViewerControls';
import NoteEditor from '../components/NoteEditor';
import SimpleVerseListViewer from './SimpleVerseListViewer';

export default function SimpleVerseListController({ user }) {
  const [translation, setTranslation] = useState('ASV');
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');
  const [books, setBooks] = useState([]);
  const [chapters, setChapters] = useState([]);
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);

  useEffect(() => {
    const loadBooks = async () => {
      const allBooks = await fetchBooks(translation);
      setBooks(allBooks);
    };
    loadBooks();
  }, [translation]);

  useEffect(() => {
    const loadChapters = async () => {
      if (book) {
        const chaps = await fetchChapters(translation, book);
        setChapters(chaps);
      }
    };
    loadChapters();
  }, [book, translation]);

  const handleViewClick = async () => {
    const data = await fetchVerses({ translation, book, chapter });
    setVerses(data);
  };

  return (
    <div className="space-y-6">
      <ViewerControls
        user={user}
        translation={translation}
        book={book}
        chapter={chapter}
        books={books}
        chapters={chapters}
        translations={[{ key: 'ASV', label: 'ASV' }]} // or pull from API
        onTranslationChange={(e) => setTranslation(e.target.value)}
        onBookChange={(e) => setBook(e.target.value)}
        onChapterChange={(e) => setChapter(e.target.value)}
        onViewClick={handleViewClick}
      />

      <SimpleVerseListViewer
        verses={verses}
        book={book}
        chapter={chapter}
        onNoteClick={(verseNum) =>
          setSelectedVerse({ book, chapter, verse: verseNum })
        }
      />

      {selectedVerse && (
        <NoteEditor
          selectedVerse={selectedVerse}
          userId={user?.loginId}
          onClose={() => setSelectedVerse(null)}
          onSave={() => setSelectedVerse(null)}
        />
      )}
    </div>
  );
}
