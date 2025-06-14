import React, { useState, useEffect } from 'react';
import { saveNote, loadNote } from '../api';

export default function NotesEditor({ reference, onClose }) {
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      if (!reference.book) return;
      setLoading(true);
      setStatus('🔄 Loading note...');

      try {
        const data = await loadNote(reference);
        setNote(data.content || '');
        setStatus(data.content ? '📝 Loaded existing note' : '🆕 No note yet');
      } catch (err) {
        console.error('Load error:', err);
        setStatus('❌ Failed to load note');
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [reference]);

  const handleSave = async () => {
    try {
      await saveNote(reference, note);
      setStatus('✅ Note saved!');
    } catch (err) {
      console.error('Save error:', err);
      setStatus('❌ Error saving note');
    }
  };

  const label = () => {
    if (!reference.book) return '';
    if (reference.verse != null) return `${reference.book} ${reference.chapter}:${reference.verse}`;
    if (reference.chapter != null) return `${reference.book} ${reference.chapter}`;
    return reference.book;
  };

  if (!reference.book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md mx-auto p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-1">📝 Notes</h2>
        <p className="text-sm text-gray-600 mb-2">{label()}</p>

        <textarea
          className="w-full h-40 p-2 border rounded text-sm"
          placeholder="Write your notes here..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={loading}
        />

        <button
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded shadow disabled:opacity-50"
          onClick={handleSave}
          disabled={loading}
        >
          Save
        </button>

        {status && <p className="text-sm mt-2 text-gray-700">{status}</p>}
      </div>
    </div>
  );
}
