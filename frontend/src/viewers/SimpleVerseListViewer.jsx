import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import SimpleVerseListViewer from '../viewers/SimpleVerseListViewer';

const SimpleVerseListViewerPage = () => {
  const [userId, setUserId] = useState(null);
  const [user, setUser] = useState({});
  const [translation, setTranslation] = useState('KJV');
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState(3);
  const [verses, setVerses] = useState([]);
  const [notes, setNotes] = useState({});
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showEditor, setShowEditor] = useState(false);

  const books = [...]; // (same book array from BibleViewer)
  const chapters = Array.from({ length: 150 }, (_, i) => i + 1);

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

  const fetchScriptureAndNotes = async () => {
    const res = await fetch(`/scriptures/${book}/${chapter}.json`);
    const data = await res.json();
    setVerses(data.verses || []);
    const newNotes = {};
    for (const verse of data.verses || []) {
      const { data } = await supabase
        .from('notes')
        .select('content')
        .eq('user_id', userId)
        .eq('book', book)
        .eq('chapter', chapter)
        .eq('verse', verse.verse)
        .single();
      if (data?.content) newNotes[verse.verse] = data.content;
    }
    setNotes(newNotes);
  };

  useEffect(() => {
    if (userId) fetchScriptureAndNotes();
  }, [book, chapter, userId]);

  const handleChange = (type, value) => {
    if (type === 'translation') setTranslation(value);
    if (type === 'book') setBook(value);
    if (type === 'chapter') setChapter(Number(value));
  };

  return (
    <SimpleVerseListViewer
      user={user}
      userId={userId}
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
      onViewClick={fetchScriptureAndNotes}
      onNoteClick={(verseInfo) => {
        setSelectedVerse(verseInfo);
        setShowEditor(true);
      }}
      onEditorClose={() => {
        setShowEditor(false);
        setSelectedVerse(null);
      }}
      onEditorSave={() => {
        setShowEditor(false);
        setSelectedVerse(null);
        fetchScriptureAndNotes();
      }}
    />
  );
};

export default SimpleVerseListViewerPage;
