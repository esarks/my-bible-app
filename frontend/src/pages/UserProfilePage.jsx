import React, { useState, useEffect } from 'react';
import { fetchUserProfile, updateUserProfile } from '../api/auth'; // Adjust as needed!

const UserProfilePage = () => {
  const [profile, setProfile] = useState({
    phoneNumber: '',
    name: '',
    email: '',
    emailVerified: false
  });
  const [loading, setLoading] = useState(true);

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (error) {
        console.error('❌ Failed to load profile:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(profile);
      alert('✅ Profile saved!');
    } catch (error) {
      console.error('❌ Failed to save profile:', error);
      alert('Error saving profile.');
    }
  };

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div style={{ margin: '20px' }}>
      <h1>User Profile</h1>

      <div style={{ marginBottom: '10px' }}>
        <label>Phone Number:</label>
        <input type="text" value={profile.phoneNumber} readOnly />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Name:</label>
        <input
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Email:</label>
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Email Verified:</label>
        <input type="checkbox" checked={profile.emailVerified} readOnly />
      </div>

      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default UserProfilePage;
