import React, { useState } from 'react';
import { requestVerificationCode, verifyCode } from '../api/auth';

const PhoneAuthForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('enter-phone'); // 'enter-phone' or 'enter-code'
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmitPhone = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await requestVerificationCode(phoneNumber);
      if (response.success) {
        setVerificationCode(response.code); // <== corrected from data.code
        setShowModal(true);
        setMessage(`Verification code sent! Please check your phone. (Code: ${response.code})`);
        setStep('enter-code');
      } else {
        setMessage('Failed to send code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending code:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await verifyCode(phoneNumber, code);
      if (response.success) {
        setMessage('Verification successful! You are now logged in.');
      } else {
        setMessage('Invalid code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <h2>Login</h2>

      {step === 'enter-phone' && (
        <form onSubmit={handleSubmitPhone}>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1 234 567 8900"
            required
          />
          <button type="submit">Send Verification Code</button>
        </form>
      )}

      {step === 'enter-code' && (
        <form onSubmit={handleSubmitCode}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            required
          />
          <button type="submit">Verify Code</button>
        </form>
      )}

      {message && <p>{message}</p>}

      {showModal && (
        <div style={{
          position: 'fixed',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <h3>Your Verification Code</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{verificationCode}</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default PhoneAuthForm;
