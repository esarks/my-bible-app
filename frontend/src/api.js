export const fetchVerses = async (book, chapter, translation) => {
  const response = await fetch(
    `https://my-bible-backend-327765964554.us-central1.run.app/api/bible?book=${book}&chapter=${chapter}&translation=${translation}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch verses');
  }

  return response.json();
};
