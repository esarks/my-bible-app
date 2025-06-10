import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ScriptureSearchPage from './pages/ScriptureSearchPage';  // ✅ Import it!

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<ScriptureSearchPage />} />   {/* ✅ Show Scripture Search on / */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
