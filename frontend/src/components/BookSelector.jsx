
// frontend/src/components/BookSelector.jsx
import React from 'react';

const books = [
  { id: 'GEN', name: 'Genesis' },
  { id: 'EXO', name: 'Exodus' },
  { id: 'LEV', name: 'Leviticus' },
  { id: 'NUM', name: 'Numbers' },
  { id: 'DEU', name: 'Deuteronomy' },
  // 👉 Add more as needed
];

export default function BookSelector({ selectedBook, onChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="book" className="block text-sm font-medium text-gray-700 mb-1">
        Book
      </label>
      <select
        id="book"
        value={selectedBook}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded shadow-sm text-sm"
      >
        {books.map((book) => (
          <option key={book.id} value={book.id}>
            {book.name}
          </option>
        ))}
      </select>
    </div>
  );
}
