const isDocker = window.location.hostname !== 'localhost';

const baseURL = isDocker
  ? 'http://my-bible-backend:8080'
  : 'http://localhost:8080';

export const fetchVerses = async (translation, book, chapter) => {
  const response = await fetch(`${baseURL}/api/bible?translation=${translation}&book=${book}&chapter=${chapter}`);
  if (!response.ok) throw new Error('Failed to fetch verses');
  return response.json();
};
