import React from 'react';

const SimpleVerseListViewer = ({ verses = [], book, chapter, notes = {}, onNoteClick }) => {
  return (
    <div className="text-left space-y-4 p-4 bg-gray-50 border rounded shadow">
      <h1 className="text-2xl font-bold">📜 Simple Verse List Viewer</h1>

      {!verses.length ? (
        <p className="text-gray-500 italic">No verses to display.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold">{book} {chapter}</h2>
          <div className="space-y-3">
            {verses.map((verse) => (
              <div key={verse.verse} className="border-b pb-2">
                <p>
                  <span className="font-bold">{verse.verse}.</span> {verse.text}
                </p>

                {notes[verse.verse] && (
                  <p className="text-sm italic text-gray-600 ml-4">
                    📝 {notes[verse.verse]}
                  </p>
                )}

                <button
                  onClick={() => onNoteClick(verse.verse)}
                  className="ml-4 text-blue-600 text-sm hover:underline"
                >
                  ✏️ Edit Note
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleVerseListViewer;
