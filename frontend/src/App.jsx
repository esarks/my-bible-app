import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Home page placeholder</h1>} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
