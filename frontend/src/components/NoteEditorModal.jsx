import NotesEditor from './NotesEditor';

export default function NoteEditorModal({ noteTarget, onClose, onSave }) {
  if (!noteTarget) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded shadow-lg p-4 w-96">
        <NotesEditor reference={noteTarget} onClose={onClose} onSave={onSave} />
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
