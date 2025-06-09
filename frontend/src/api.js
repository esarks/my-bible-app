// Use environment variable injected by Vite (like VITE_API_URL)
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const fetchVerses = async (translation, book, chapter) => {
  const response = await fetch(`${baseURL}/api/bible?translation=${translation}&book=${book}&chapter=${chapter}`);
  if (!response.ok) throw new Error('Failed to fetch verses');
  return response.json();
};
