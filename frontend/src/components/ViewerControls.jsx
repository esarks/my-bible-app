import React from 'react';

const ViewerControls = ({
  user,
  translation,
  book,
  chapter,
  translations,
  books,
  chapters,
  onTranslationChange,
  onBookChange,
  onChapterChange,
  onViewClick,
}) => {
  return (
    <div className="space-y-4 p-4 bg-white shadow rounded">
      <div className="text-sm text-gray-600">
        <p><strong>User:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>ID:</strong> {user?.loginId}</p>
      </div>

      <div className="flex gap-4">
        <div>
          <label>Bible Translation</label><br />
          <select value={translation} onChange={onTranslationChange}>
            {translations.map((t) => (
              <option key={t.key} value={t.key}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Book</label><br />
          <select value={book} onChange={onBookChange}>
            {books.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Chapter</label><br />
          <select value={chapter} onChange={onChapterChange}>
            {chapters.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={onViewClick} className="bg-blue-600 text-white px-4 py-2 rounded">
        View Chapter
      </button>
    </div>
  );
};

export default ViewerControls;
