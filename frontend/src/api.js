const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Fetches verses from the backend API.
 */
export const fetchVerses = async (translation, book, chapter) => {
  const url = `${baseURL}/api/bible?translation=${translation}&book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}`;
  console.info('fetchVerses →', { translation, book, chapter, url });
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch verses');
  return response.json();
};

/**
 * Saves a note to the backend.
 * @param {object} reference - { loginId, book, chapter, verse }
 * @param {string} content - note content
 */
export const saveNote = async (reference, content) => {
  const response = await fetch(`${baseURL}/api/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...reference, content }),
  });
  if (!response.ok) throw new Error('Failed to save note');
  return response.json();
};

/**
 * Loads an existing note from the backend.
 * @param {object} reference - { loginId, book, chapter?, verse? }
 */
export const loadNote = async (reference) => {
  const params = new URLSearchParams();
  params.set('loginId', reference.loginId);
  params.set('book', reference.book);
  if (reference.chapter != null) params.set('chapter', reference.chapter);
  if (reference.verse != null) params.set('verse', reference.verse);

  const url = `${baseURL}/api/notes?${params.toString()}`;
  console.info('loadNote →', { url });
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to load note');
  return response.json();
};
