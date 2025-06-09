const getBaseURL = () => {
  // If running in the browser (frontend):
  if (typeof window !== 'undefined') {
    // 1️⃣ If on localhost, use the local backend
    if (window.location.hostname === 'localhost') {
      return 'http://localhost:8080';
    }
    // 2️⃣ If deployed (like on GCP), use the backend public HTTPS endpoint
    return 'https://my-bible-backend-xyz.a.run.app'; // replace with your backend HTTPS URL
  }
  // 3️⃣ In other contexts (Node), fallback
  return 'http://localhost:8080';
};

const baseURL = getBaseURL();

export const fetchVerses = async (translation, book, chapter) => {
  const response = await fetch(`${baseURL}/api/bible?translation=${translation}&book=${book}&chapter=${chapter}`);
  if (!response.ok) throw new Error('Failed to fetch verses');
  return response.json();
};
