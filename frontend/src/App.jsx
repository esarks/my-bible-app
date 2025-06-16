import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import BibleViewer from './pages/BibleViewerPage';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({
          name: session.user.user_metadata?.name || 'Anonymous',
          email: session.user.email,
          loginId: session.user.id,
        });
      }
    };
    getSession();
  }, []);

  return (
    <Router>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <nav style={{ marginBottom: '20px' }}>
          <Link to="/">Home</Link> | <Link to="/login">Login</Link> | <Link to="/profile">Profile</Link>
        </nav>
        <Routes>
          <Route path="/" element={<BibleViewer user={user} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfilePage user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
