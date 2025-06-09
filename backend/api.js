// api.js

/**
 * Fetch Bible chapter data from the backend.
 * @param {string} book - The book name (e.g., "Genesis")
 * @param {string} chapter - The chapter number (e.g., "1")
 * @returns {Promise<Object>} - The fetched JSON data or an error object.
 */
export const fetchBibleChapter = async (book, chapter) => {
  try {
    const response = await fetch(`/api/bible?book=${book}&chapter=${chapter}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API fetchBibleChapter error:', error);
    return { error: error.message };
  }
};
