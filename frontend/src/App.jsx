import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ScriptureSearchPage from './pages/ScriptureSearchPage';
import UserProfilePage from './pages/UserProfilePage'; // ✅ Import the new UserProfilePage!

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ScriptureSearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfilePage />} /> {/* ✅ Add this line */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
