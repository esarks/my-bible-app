import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import UserProfilePage from './pages/UserProfilePage';
import PlasmicTestPage from './pages/PlasmicTestPage'; // 👈 new route for Plasmic rendering
import { PlasmicRootProvider } from '@plasmicapp/loader-react';
import { PLASMIC } from './plasmic-init';
import BibleShellPage from './pages/BibleShellPage';

export default function App() {
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
    <PlasmicRootProvider loader={PLASMIC}>
      <Router>
        <Routes>
          {/* Plasmic layout rendered at this route */}
          <Route path="/plasmic" element={<PlasmicTestPage />} />

          {/* Your main app routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<UserProfilePage user={user} />} />
            <Route path="/viewer" element={<BibleShellPage />} />
          </Route>
        </Routes>
      </Router>
    </PlasmicRootProvider>
  );
}
