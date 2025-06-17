// components/BiblePassageSelector.jsx
import BibleSelector from './BibleSelector';

export default function BiblePassageSelector({
  translation,
  book,
  chapter,
  chapters,
  books,
  onTranslationChange,
  onBookChange,
  onChapterChange,
  onViewClick,
}) {
  return (
    <div className="space-y-4">
      <BibleSelector selected={translation} onChange={onTranslationChange} />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Book</label>
        <select
          value={book}
          onChange={onBookChange}
          className="w-full p-2 border rounded shadow-sm text-sm"
        >
          <option value="">Select a book</option>
          {books.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {chapters.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Chapter</label>
          <select
            value={chapter}
            onChange={onChapterChange}
            className="w-full p-2 border rounded shadow-sm text-sm"
          >
            <option value="">Select a chapter</option>
            {chapters.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={onViewClick}
        disabled={!translation || !book || !chapter}
        className="bg-blue-500 text-white px-4 py-2 rounded shadow disabled:opacity-50"
      >
        View Chapter
      </button>
    </div>
  );
}
