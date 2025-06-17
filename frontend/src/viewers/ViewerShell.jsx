import { useState } from 'react';
import BibleViewer from '../pages/BibleViewerPage';

const viewerOptions = [
  { key: 'bible', label: '📖 Bible Viewer', component: BibleViewer },
  // Add more viewers here as needed
];

export default function ViewerShell({ user }) {
  const [selectedKey, setSelectedKey] = useState('bible');

  const selectedViewer = viewerOptions.find((v) => v.key === selectedKey);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="viewer-select" className="font-semibold mr-2">
          Choose Viewer:
        </label>
        <select
          id="viewer-select"
          value={selectedKey}
          onChange={(e) => setSelectedKey(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          {viewerOptions.map((v) => (
            <option key={v.key} value={v.key}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render the selected viewer */}
      {selectedViewer?.component && (
        <selectedViewer.component user={user} />
      )}
    </div>
  );
}
