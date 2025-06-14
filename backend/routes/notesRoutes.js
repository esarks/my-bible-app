// routes/notesRoutes.js
import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get notes for a user by book/chapter/verse
router.get('/', async (req, res) => {
  const { userId, book, chapter, verse } = req.query;

  if (!userId || !book) {
    return res.status(400).json({ error: 'Missing required fields: userId, book' });
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        loginId: userId,
        book,
        chapter: chapter ? parseInt(chapter) : null,
        verse: verse ? parseInt(verse) : null
      },
    });
    res.json(notes.length > 0 ? notes[0] : {}); // assuming one note per location
  } catch (err) {
    console.error('Failed to fetch notes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Save or update a note
router.post('/', async (req, res) => {
  const { userId, book, chapter, verse, content } = req.body;

  if (!userId || !book || !content) {
    return res.status(400).json({ error: 'Missing required fields: userId, book, content' });
  }

  try {
    const existingNote = await prisma.note.findFirst({
      where: {
        loginId: userId,
        book,
        chapter: chapter ?? null,
        verse: verse ?? null
      },
    });

    if (existingNote) {
      const updated = await prisma.note.update({
        where: { id: existingNote.id },
        data: { content },
      });
      res.json(updated);
    } else {
      const created = await prisma.note.create({
        data: {
          loginId: userId,
          book,
          chapter: chapter ?? null,
          verse: verse ?? null,
          content,
        },
      });
      res.json(created);
    }
  } catch (err) {
    console.error('Failed to save note:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
