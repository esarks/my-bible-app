import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlasmicLoginPage } from '../plasmic/my_bible_app_ui/PlasmicLoginPage';
import PhoneAuthForm from '../components/PhoneAuthForm';

const LoginPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <PlasmicLoginPage
      // 🧩 Use Plasmic slot for dynamic content
      startButtonSlot={
        !showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded shadow"
          >
            Start Login
          </button>
        ) : null
      }
      authFormSlot={showForm ? <PhoneAuthForm /> : null}
      profileLinkSlot={
        <div style={{ marginTop: '20px' }}>
          <Link to="/profile">Go to User Profile</Link>
        </div>
      }
    />
  );
};

export default LoginPage;
