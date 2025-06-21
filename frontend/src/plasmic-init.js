// File: src/plasmic-init.js
import { initPlasmicLoader } from '@plasmicapp/loader-react';
import BibleViewer from './viewers/BibleViewer';
import VerseNoteTable from './components/VerseNoteTable';
import NoteEditorModal from './components/NoteEditorModal';

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: '9ALKC1eSkKzzoBpvUcK3nT',
      token:
        'MiBIECnFnkdaH5fWqFt181f3EbHNBfc41bQ3psRSOQRT3Nw705YSn6qnJ8lXB5PtY3Cy3TXJtxUv25ZqyMg',
    },
  ],
});

// Register BibleViewer with detailed prop definitions
PLASMIC.registerComponent(BibleViewer, {
  name: 'BibleViewer',
  props: {
    loginId: { type: 'string', defaultValue: 'demoUser123' },
    book: {
      type: 'choice',
      options: [
        'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy',
        'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
        '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles',
        'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs',
        'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
        'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos',
        'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
        'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke',
        'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians',
        'Galatians', 'Ephesians', 'Philippians', 'Colossians',
        '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy',
        'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter',
        '1 John', '2 John', '3 John', 'Jude', 'Revelation'
      ],
      defaultValue: 'Genesis',
    },
    chapter: { type: 'number', defaultValue: 1 },
  },
});

PLASMIC.registerComponent(VerseNoteTable, {
  name: 'VerseNoteTable',
  props: {
    book: { type: 'string', defaultValue: 'Genesis' },
    chapter: { type: 'number', defaultValue: 1 },
    loginId: { type: 'string', defaultValue: 'demoUser123' },
  },
});

PLASMIC.registerComponent(NoteEditorModal, {
  name: 'NoteEditorModal',
  props: {
    isOpen: { type: 'boolean', defaultValue: false },
    onClose: 'function',
    verse: { type: 'string', defaultValue: '1' },
    note: { type: 'string', defaultValue: '' },
    onSave: 'function',
  },
});
