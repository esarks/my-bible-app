import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import Home from './pages/Home';
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
      <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800">
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 py-4 flex justify-center space-x-4 text-blue-600 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <span>|</span>
            <Link to="/login" className="hover:underline">Login</Link>
            <span>|</span>
            <Link to="/profile" className="hover:underline">Profile</Link>
          </nav>
        </header>

        <main className="flex-grow container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage user={user} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
