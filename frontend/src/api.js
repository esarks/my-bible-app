export const fetchVerses = async (book, chapter) => {
  const response = await fetch(`/api/bible?book=${book}&chapter=${chapter}`);
  if (!response.ok) {
    throw new Error('Failed to fetch verses');
  }
  return response.json();
};
