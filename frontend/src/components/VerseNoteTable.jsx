export default function VerseNoteTable({ verses, notes }) {
  if (!verses || verses.length === 0) return null;

  return (
    <div className="overflow-x-auto mt-6">
      <table className="table-fixed w-full border-t border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 w-3/4">📖 Verse</th>
            <th className="p-2 w-1/4">📝 Note</th>
          </tr>
        </thead>
        <tbody>
          {verses.map((v, i) => (
            <tr key={i} className="border-t align-top">
              <td className="p-2 break-words align-top">
                <strong>{v.verse}.</strong> {v.text}
              </td>
              <td className="p-2 text-sm text-gray-700 italic break-words align-top">
                {notes[v.verse] || 'No note'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
