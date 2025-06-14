import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import BibleViewer from './pages/BibleViewerPage';
import { useState } from 'react';

function App() {
  const [userId, setUserId] = useState('test-user'); // Replace with actual login logic later

  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BibleViewer userId={userId} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
