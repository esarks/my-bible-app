
// frontend/src/components/ChapterSelector.jsx
import React from 'react';

export default function ChapterSelector({ selectedChapter, onChange, totalChapters = 50 }) {
  const chapters = Array.from({ length: totalChapters }, (_, i) => i + 1);

  return (
    <div className="mb-4">
      <label htmlFor="chapter" className="block text-sm font-medium text-gray-700 mb-1">
        Chapter
      </label>
      <select
        id="chapter"
        value={selectedChapter}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full p-2 border rounded shadow-sm text-sm"
      >
        {chapters.map((chapter) => (
          <option key={chapter} value={chapter}>
            {chapter}
          </option>
        ))}
      </select>
    </div>
  );
}
