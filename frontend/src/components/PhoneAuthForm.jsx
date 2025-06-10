import React, { useState } from 'react';
import { requestVerificationCode, verifyCode } from '../api/auth';

const PhoneAuthForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [step, setStep] = useState('enter-phone'); // 'enter-phone' or 'enter-code'
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitPhone = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // No need for a separate "mode" - backend decides if new or existing user
      const response = await requestVerificationCode(phoneNumber);
      if (response.success) {
        setMessage('Verification code sent! Please check your phone.');
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
        // Optionally redirect or update session state here
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
    </div>
  );
};

export default PhoneAuthForm;
