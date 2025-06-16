import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const ChapterNote = ({ book, chapter, userId }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      if (!book || !chapter || !userId) return;

      const { data, error } = await supabase
        .from('notes')
        .select('text')
        .eq('user_id', userId)
        .eq('book', book)
        .eq('chapter', chapter)
        .is('verse', null)
        .single();

      if (error) {
        console.warn('No chapter note found or error:', error.message);
        setNote('');
      } else {
        setNote(data.text);
      }
    };

    fetchNote();
  }, [book, chapter, userId]);

  if (!note) return null;

  return (
    <div className="p-4 bg-blue-50 border border-blue-300 rounded note-block">
      <strong>📖 Note for {book} {chapter}:</strong>
      <p className="mt-1 text-gray-700">{note}</p>
    </div>
  );
};

export default ChapterNote;
