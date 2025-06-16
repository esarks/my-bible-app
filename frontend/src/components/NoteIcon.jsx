import React from 'react';

const NoteIcon = ({ verse, book, chapter, userId, onOpenEditor }) => {
  if (!userId) return null;

  const handleClick = () => {
    onOpenEditor({ book, chapter, verse });
  };

  return (
    <button
      onClick={handleClick}
      className="absolute right-2 top-0 text-blue-600 text-sm opacity-0 group-hover:opacity-100"
      title="Add/Edit Note"
    >
      ✎
    </button>
  );
};

export default NoteIcon;
