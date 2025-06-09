import { useState } from 'react';

function App() {
  const [books] = useState([
    'Genesis',
    'Exodus',
    'Leviticus', // Add more as you grow!
  ]);
  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [verses, setVerses] = useState([]);

  // Handler: When book changes
  const handleBookChange = (e) => {
    const book = e.target.value;
    setSelectedBook(book);
    setSelectedChapter('');
    setVerses([]);

    // Simple chapter range for demo
    if (book === 'Genesis') {
      setChapters(Array.from({ length: 50 }, (_, i) => i + 1));
    } else if (book === 'Exodus') {
      setChapters(Array.from({ length: 40 }, (_, i) => i + 1));
    } else if (book === 'Leviticus') {
      setChapters(Array.from({ length: 27 }, (_, i) => i + 1));
    }
  };

  // Handler: Fetch verses for selected book & chapter
  const fetchVerses = async () => {
    if (!selectedBook || !selectedChapter) return;

    try {
      const response = await fetch(
        `/api/bible?book=${selectedBook}&chapter=${selectedChapter}`
      );
      const data = await response.json();
      setVerses(data.verses || []);
    } catch (error) {
      console.error('Error fetching verses:', error);
      setVerses(['Error fetching verses']);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>My Bible App</h1>

      <div style={{ margin: '20px' }}>
        <label htmlFor="book-select">Select Book: </label>
        <select
          id="book-select"
          value={selectedBook}
          onChange={handleBookChange}
        >
          <option value="">--Choose a Book--</option>
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>
      </div>

      {chapters.length > 0 && (
        <div style={{ margin: '20px' }}>
          <label htmlFor="chapter-select">Select Chapter: </label>
          <select
            id="chapter-select"
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
          >
            <option value="">--Choose a Chapter--</option>
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedBook && selectedChapter && (
        <button onClick={fetchVerses}>Fetch Verses</button>
      )}

      {verses.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>{selectedBook} {selectedChapter}</h3>
          {verses.map((verse, idx) => (
            <p key={idx}>{verse}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
