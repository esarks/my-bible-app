// Use environment variable injected by Vite (like VITE_API_URL)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Fetches verses from the backend API.
 * @param {string} translation - The translation (e.g., asv, kjv).
 * @param {string} book - The name of the book.
 * @param {number|string} chapter - The chapter number.
 * @returns {Promise<object>} - JSON response with verses.
 */
export const fetchVerses = async (translation, book, chapter) => {
  const url = `${baseURL}/api/bible?translation=${translation}&book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`API request failed: ${response.status} ${response.statusText}`);
    throw new Error('Failed to fetch verses');
  }

  return response.json();
};
