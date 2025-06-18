export default function PassageSelector({
  translation,
  book,
  chapter,
  chapters,
  onTranslationChange,
  onBookChange,
  onChapterChange,
  onFetchClick,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 mt-4">
      <div>
        <label className="block text-sm font-medium">Translation</label>
        <select
          value={translation}
          onChange={onTranslationChange}
          className="border rounded px-2 py-1 w-32"
        >
          {['ASV', 'KJV', 'NIV', 'NLT', 'ESV', 'BSB'].map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Book</label>
        <select
          value={book}
          onChange={onBookChange}
          className="border rounded px-2 py-1 w-40"
        >
          <option value="">Select a book</option>
          {import('../constants/Constants').then(({ books }) =>
            books.map(b => <option key={b} value={b}>{b}</option>)
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Chapter</label>
        <select
          value={chapter}
          onChange={onChapterChange}
          className="border rounded px-2 py-1 w-24"
        >
          <option value="">Select chapter</option>
          {chapters.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <button
        onClick={onFetchClick}
        className="h-10 bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
      >
        View Chapter
      </button>
    </div>
  );
}
