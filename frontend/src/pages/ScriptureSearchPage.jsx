import { useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ Add Link for navigation
import { fetchVerses } from '../api';

const ScriptureSearchPage = () => {
  const [translations] = useState([
    'ASV', 'ASV2', 'Bishops', 'Coverdale', 'Geneva', 'KJV', 'KJV_Strongs', 'NET', 'Tyndale', 'WEB'
  ]);
  const [selectedTranslation, setSelectedTranslation] = useState('ASV');

  const [books] = useState([
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth',
    '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah',
    'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah',
    'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah',
    'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke',
    'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians',
    'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
    'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'
  ]);

  const [selectedBook, setSelectedBook] = useState('');
  const [chapters, setChapters] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [verses, setVerses] = useState([]);

  const handleBookChange = (e) => {
    const book = e.target.value;
    setSelectedBook(book);
    setSelectedChapter('');
    setVerses([]);

    const chapterCounts = {
      Genesis: 50, Exodus: 40, Leviticus: 27, Numbers: 36, Deuteronomy: 34,
      Joshua: 24, Judges: 21, Ruth: 4, '1 Samuel': 31, '2 Samuel': 24,
      '1 Kings': 22, '2 Kings': 25, '1 Chronicles': 29, '2 Chronicles': 36,
      Ezra: 10, Nehemiah: 13, Esther: 10, Job: 42, Psalms: 150, Proverbs: 31,
      Ecclesiastes: 12, 'Song of Solomon': 8, Isaiah: 66, Jeremiah: 52, Lamentations: 5,
      Ezekiel: 48, Daniel: 12, Hosea: 14, Joel: 3, Amos: 9, Obadiah: 1, Jonah: 4,
      Micah: 7, Nahum: 3, Habakkuk: 3, Zephaniah: 3, Haggai: 2, Zechariah: 14,
      Malachi: 4, Matthew: 28, Mark: 16, Luke: 24, John: 21, Acts: 28, Romans: 16,
      '1 Corinthians': 16, '2 Corinthians': 13, Galatians: 6, Ephesians: 6, Philippians: 4,
      Colossians: 4, '1 Thessalonians': 5, '2 Thessalonians': 3, '1 Timothy': 6,
      '2 Timothy': 4, Titus: 3, Philemon: 1, Hebrews: 13, James: 5, '1 Peter': 5,
      '2 Peter': 3, '1 John': 5, '2 John': 1, '3 John': 1, Jude: 1, Revelation: 22
    };

    const chapterCount = chapterCounts[book] || 0;
    setChapters(Array.from({ length: chapterCount }, (_, i) => i + 1));
  };

  const fetchChapter = async () => {
    if (!selectedTranslation || !selectedBook || !selectedChapter) return;

    try {
      const data = await fetchVerses(selectedTranslation, selectedBook, selectedChapter);
      setVerses(data.verses || []);
    } catch (error) {
      console.error('Error fetching verses:', error);
      setVerses([{ verse: '', text: 'Error fetching verses' }]);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* ✅ Add navigation links to Home and Profile */}
      <div style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> | <Link to="/profile">Profile</Link>
      </div>

      <h1>Scripture Search</h1>

      <div style={{ margin: '20px' }}>
        <label htmlFor="translation-select">Select Translation: </label>
        <select
          id="translation-select"
          value={selectedTranslation}
          onChange={(e) => setSelectedTranslation(e.target.value)}
        >
          {translations.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div style={{ margin: '20px' }}>
        <label htmlFor="book-select">Select Book: </label>
        <select id="book-select" value={selectedBook} onChange={handleBookChange}>
          <option value="">--Choose a Book--</option>
          {books.map((book) => (
            <option key={book} value={book}>{book}</option>
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
              <option key={ch} value={ch}>{ch}</option>
            ))}
          </select>
        </div>
      )}

      {selectedBook && selectedChapter && (
        <button onClick={fetchChapter}>Fetch Verses</button>
      )}

      {verses.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3>{selectedTranslation} - {selectedBook} {selectedChapter}</h3>
          {verses.map((verseObj, idx) => (
            <p key={idx}><strong>{verseObj.verse}.</strong> {verseObj.text}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default ScriptureSearchPage;
