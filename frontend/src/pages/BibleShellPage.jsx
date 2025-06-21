import * as React from 'react';
import { PlasmicBibleViewerShell } from '../plasmic/my_bible_app_ui/PlasmicBibleViewerShell';
import BibleViewer from '../components/BibleViewer';

export default function BibleShellPage() {
  return (
    <PlasmicBibleViewerShell>
      <BibleViewer />
    </PlasmicBibleViewerShell>
  );
}
