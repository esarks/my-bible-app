export const fetchVerses = async (book, chapter) => {
  const response = await fetch(`https://my-bible-backend-327765964554.us-central1.run.app/api/bible?book=${book}&chapter=${chapter}`);

  if (!response.ok) {
    throw new Error('Failed to fetch verses');
  }
  return response.json();
};
