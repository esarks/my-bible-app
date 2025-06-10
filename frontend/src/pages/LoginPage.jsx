import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this
import PhoneAuthForm from '../components/PhoneAuthForm';

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <PhoneAuthForm />
      <div style={{ marginTop: '20px' }}>
        {/* ✅ Add the link to the User Profile page */}
        <Link to="/profile">Go to User Profile</Link>
      </div>
    </div>
  );
};

export default LoginPage;
