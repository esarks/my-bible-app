import React from 'react';

const ViewerLayout = ({
  user,
  translation,
  book,
  chapter,
  translations = [],
  books = [],
  chapters = [],
  onTranslationChange,
  onBookChange,
  onChapterChange,
  onViewClick,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">📖 Bible Viewer</h1>

      <div className="bg-gray-100 p-3 mb-4 rounded shadow text-sm text-gray-800">
        <p><strong>Logged in as:</strong> {user?.name || 'Unknown User'}</p>
        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        <p><strong>Login ID:</strong> {user?.loginId || 'Not Set'}</p>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Bible Translation</label>
        <select
          value={translation}
          onChange={onTranslationChange}
          className="w-full p-2 border rounded shadow-sm text-sm"
        >
          {Array.isArray(translations) && translations.map((t) => (
            <option key={t.key} value={t.key}>{t.label}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
        <select
          value={book}
          onChange={onBookChange}
          className="w-full p-2 border rounded shadow-sm text-sm"
        >
          {Array.isArray(books) && books.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
        <select
          value={chapter}
          onChange={onChapterChange}
          className="w-full p-2 border rounded shadow-sm text-sm"
        >
          {Array.isArray(chapters) && chapters.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button
        onClick={onViewClick}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
      >
        View Chapter
      </button>
    </div>
  );
};

export default ViewerLayout;
