import React from 'react';

const SimpleVerseListViewer = ({ verses = [], book, chapter }) => {
  return (
    <div className="text-left space-y-4 p-4 bg-gray-50 border rounded shadow">
      <h1 className="text-2xl font-bold">📜 Simple Verse List Viewer</h1>

      {!verses.length ? (
        <p className="text-gray-500 italic">No verses to display.</p>
      ) : (
        <>
          <h2 className="text-xl font-semibold">
            {book} {chapter}
          </h2>
          <div className="space-y-1">
            {verses.map((verse) => (
              <p key={verse.verse}>
                <span className="font-bold">{verse.verse}.</span> {verse.text}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleVerseListViewer;
