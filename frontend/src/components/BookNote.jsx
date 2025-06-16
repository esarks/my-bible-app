import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

const BookNote = ({ book, userId }) => {
  const [note, setNote] = useState('');

  useEffect(() => {
    const fetchNote = async () => {
      if (!book || !userId) return;

      const { data, error } = await supabase
        .from('notes')
        .select('text')
        .eq('user_id', userId)
        .eq('book', book)
        .is('chapter', null) // it's a book-level note
        .is('verse', null)
        .single();

      if (error) {
        console.warn('No book note found or error:', error.message);
        setNote('');
      } else {
        setNote(data.text);
      }
    };

    fetchNote();
  }, [book, userId]);

  if (!note) return null;

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-300 rounded note-block">
      <strong>📘 Note for {book}:</strong>
      <p className="mt-1 text-gray-700">{note}</p>
    </div>
  );
};

export default BookNote;
