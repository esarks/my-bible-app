import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ViewerLayout from '../components/ViewerLayout';
import ViewerControls from '../components/ViewerControls';
import NoteEditor from '../components/NoteEditor';
import ScriptureText from '../components/ScriptureText';

const BibleViewer = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  const [translation, setTranslation] = useState('KJV');
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState(3);
  const [verses, setVerses] = useState([]);
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const translations = [
    { key: 'KJV', label: 'King James Version' },
    { key: 'NIV', label: 'New International Version' }
  ];

  const books = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
    '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra',
    'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon',
    'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
    'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah',
    'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians',
    '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians',
    '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ];

  const chapters = Array.from({ length: 150 }, (_, i) => i + 1); // up to 150 chapters for Psalms

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.id) {
        setUserId(session.user.id);
        setUser({
          name: session.user.user_metadata?.name || 'Anonymous',
          email: session.user.email,
          loginId: session.user.id,
        });
      }
    };
    getSession();
  }, []);

  useEffect(() => {
    const fetchScripture = async () => {
      const res = await fetch(`/scriptures/${book}/${chapter}.json`);
      const data = await res.json();
      setVerses(data.verses || []);
    };
    fetchScripture();
  }, [book, chapter]);

  const handleEditorClose = () => {
    setShowEditor(false);
    setSelectedVerse(null);
  };

  const handleEditorSave = () => {
    setShowEditor(false);
  };

  return (
    <ViewerLayout>
      <ViewerControls
        user={user}
        translation={translation}
        book={book}
        chapter={chapter}
        translations={translations}
        books={books}
        chapters={chapters}
        onTranslationChange={(e) => setTranslation(e.target.value)}
        onBookChange={(e) => setBook(e.target.value)}
        onChapterChange={(e) => setChapter(Number(e.target.value))}
        onViewClick={() => {}}
      />

      <ScriptureText
        verses={verses}
        book={book}
        chapter={chapter}
        userId={userId}
        onOpenEditor={(verseInfo) => {
          setSelectedVerse(verseInfo);
          setShowEditor(true);
        }}
      />

      {showEditor && userId && (
        <NoteEditor
          selectedVerse={selectedVerse}
          userId={userId}
          onClose={handleEditorClose}
          onSave={handleEditorSave}
        />
      )}
    </ViewerLayout>
  );
};

export default BibleViewer;
