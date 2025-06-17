import { useState } from 'react';
import BibleViewer from '../viewers/BibleViewer';
import SimpleVerseListViewer from '../viewers/SimpleVerseListViewer';

const viewerOptions = [
  { key: 'bible', label: '📖 Bible Viewer', component: BibleViewer },
  { key: 'simple', label: '📜 Simple Verse List Viewer', component: SimpleVerseListViewer },
];

export default function ViewerShell({ user }) {
  const [selectedKey, setSelectedKey] = useState('bible');
  const selectedViewer = viewerOptions.find((v) => v.key === selectedKey);

  return (
    <div className="space-y-4">
      <div>
        <label className="mr-2 font-semibold">Choose Viewer:</label>
        <select
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {viewerOptions.map((v) => (
            <option key={v.key} value={v.key}>{v.label}</option>
          ))}
        </select>
      </div>

      {/* Render selected viewer page */}
      {selectedViewer?.component && <selectedViewer.component user={user} />}
    </div>
  );
}
