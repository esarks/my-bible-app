// routes/notesRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// GET /api/notes?loginId=...&book=...&chapter=...&verse=...
router.get('/', async (req, res) => {
  const { loginId, book, chapter, verse } = req.query;

  console.log('📥 Incoming GET /api/notes');
  console.log('🔍 Query Params:', { loginId, book, chapter, verse });

  if (!loginId || !book) {
    console.warn('⚠️ Missing required fields in GET request');
    return res.status(400).json({ error: 'Missing required fields: loginId and book are required.' });
  }

  const where = { loginId, book };

  // Handle chapter if present
  if (chapter !== undefined && chapter !== '') {
    const parsedChapter = parseInt(chapter, 10);
    if (isNaN(parsedChapter)) {
      return res.status(400).json({ error: 'Invalid chapter value' });
    }
    where.chapter = parsedChapter;
  } else {
    where.chapter = null;
  }

  // Handle verse if present
  if (verse !== undefined && verse !== '') {
    const parsedVerse = parseInt(verse, 10);
    if (isNaN(parsedVerse)) {
      return res.status(400).json({ error: 'Invalid verse value' });
    }
    where.verse = parsedVerse;
  } else {
    where.verse = null;
  }

  console.log('🧩 Final where clause:', where);

  try {
    const notes = await prisma.note.findMany({ where });
    console.log(`✅ Found ${notes.length} note(s)`);
    res.json(notes.length > 0 ? notes[0] : {});
  } catch (err) {
    console.error('❌ Failed to fetch notes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/notes
router.post('/', async (req, res) => {
  const { loginId, book, chapter, verse, content } = req.body;

  console.log('📥 Incoming POST /api/notes');
  console.log('📝 Request Body:', { loginId, book, chapter, verse, content });

  if (!loginId || !book || !content) {
    console.warn('⚠️ Missing required fields in POST request');
    return res.status(400).json({ error: 'Missing required fields: loginId, book, content are required.' });
  }

  const parsedChapter = chapter !== undefined ? chapter : null;
  const parsedVerse = verse !== undefined ? verse : null;

  const where = {
    loginId,
    book,
    chapter: parsedChapter,
    verse: parsedVerse,
  };

  try {
    const existingNote = await prisma.note.findFirst({ where });

    if (existingNote) {
      console.log('✏️ Updating existing note');
      const updated = await prisma.note.update({
        where: { id: existingNote.id },
        data: { content },
      });
      res.json(updated);
    } else {
      console.log('🆕 Creating new note');
      const created = await prisma.note.create({
        data: {
          loginId,
          book,
          chapter: parsedChapter,
          verse: parsedVerse,
          content,
        },
      });
      res.json(created);
    }
  } catch (err) {
    console.error('❌ Failed to save note:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
