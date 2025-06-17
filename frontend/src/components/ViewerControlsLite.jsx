import React from 'react';

export default function ViewerControlsLite({ translation, book, chapter, books, chapters, onChange, onView }) {
  return (
    <div className="space-x-2 mb-4">
      <select value={translation} onChange={(e) => onChange('translation', e.target.value)}>
        <option value="ASV">ASV</option>
        <option value="KJV">KJV</option>
      </select>

      <select value={book} onChange={(e) => onChange('book', e.target.value)}>
        <option value="">Select a book</option>
        {books.map((b) => <option key={b} value={b}>{b}</option>)}
      </select>

      <select value={chapter} onChange={(e) => onChange('chapter', e.target.value)}>
        <option value="">Select a chapter</option>
        {chapters.map((c) => <option key={c} value={c}>{c}</option>)}
      </select>

      <button onClick={onView} className="px-2 py-1 bg-blue-600 text-white rounded">
        View Chapter
      </button>
    </div>
  );
}
