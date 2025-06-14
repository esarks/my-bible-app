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

  const parsedChapter = chapter ? parseInt(chapter, 10) : null;
  const parsedVerse = verse ? parseInt(verse, 10) : null;

  if ((chapter && isNaN(parsedChapter)) || (verse && isNaN(parsedVerse))) {
    console.warn('⚠️ Invalid chapter or verse input');
    return res.status(400).json({ error: 'Chapter and verse must be valid numbers if provided.' });
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        loginId,
        book,
        chapter: parsedChapter,
        verse: parsedVerse
      },
    });

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

  const parsedChapter = chapter ?? null;
  const parsedVerse = verse ?? null;

  try {
    const existingNote = await prisma.note.findFirst({
      where: {
        loginId,
        book,
        chapter: parsedChapter,
        verse: parsedVerse
      },
    });

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
