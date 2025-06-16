import React from 'react';
import NoteIcon from './NoteIcon';

const ScriptureText = ({ verses, notes = {}, onNoteClick }) => {
  if (!verses || verses.length === 0) {
    return <p className="text-gray-500">No verses available.</p>;
  }

  return (
    <div className="space-y-4">
      {verses.map((verse) => (
        <div
          key={verse.verse}
          className="relative group border-l-4 border-gray-200 pl-4 verse-line"
        >
          <span className="font-semibold">{verse.verse}</span> {verse.text}
          <NoteIcon verse={verse.verse} onClick={onNoteClick} />

          {notes[verse.verse] && (
            <p className="text-sm text-gray-600 italic mt-1 ml-4">
              📝 {notes[verse.verse]}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScriptureText;
