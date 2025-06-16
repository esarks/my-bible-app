import React from 'react';

const ViewerLayout = ({
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
    <div className="text-center">
      <h1>📖 Bible Viewer</h1>

      <p><strong>Logged in as:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Login ID:</strong> {user?.loginId}</p>

      <div>
        <label htmlFor="translation">Bible Translation:</label>{' '}
        <select id="translation" value={translation} onChange={onTranslationChange}>
          {translations.map((t) => (
            <option key={t.key} value={t.key}>{t.label}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book">Book:</label>{' '}
        <select id="book" value={book} onChange={onBookChange}>
          {books.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="chapter">Chapter:</label>{' '}
        <select id="chapter" value={chapter} onChange={onChapterChange}>
          {chapters.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <button onClick={onViewClick}>View Chapter</button>
    </div>
  );
};

export default ViewerLayout;
