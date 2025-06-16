import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const NoteEditor = ({ selectedVerse, userId, onClose, onSave }) => {
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (!selectedVerse || !userId) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('note')
        .eq('login_id', userId)
        .eq('book', selectedVerse.book)
        .eq('chapter', selectedVerse.chapter)
        .eq('verse', selectedVerse.verse)
        .single();

      if (data?.note) setNoteText(data.note);
      setLoading(false);
    };

    fetchNote();
  }, [selectedVerse, userId]);

  const handleSave = async () => {
    if (!userId || !selectedVerse) return;

    setLoading(true);

    const { error } = await supabase
      .from('notes')
      .upsert({
        login_id: userId,
        book: selectedVerse.book,
        chapter: selectedVerse.chapter,
        verse: selectedVerse.verse,
        note: noteText,
      });

    setLoading(false);
    if (!error) onSave(); // Trigger any refreshes needed
  };

  if (!selectedVerse) return null;

  return (
    <div className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg shadow">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-md font-semibold">
          Notes for {selectedVerse.book} {selectedVerse.chapter}:{selectedVerse.verse}
        </h3>
        <button onClick={onClose} className="text-sm text-red-600 hover:underline">
          Close
        </button>
      </div>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded resize-none"
        placeholder="Write your note here..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Note'}
      </button>
    </div>
  );
};

export default NoteEditor;
