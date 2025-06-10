const API_BASE = 'http://localhost:8080/api/auth';  // Existing endpoints for auth
const PROFILE_API_BASE = 'http://localhost:8080/api/user-profile';  // New endpoints for profile!

// Existing auth functions
export const requestVerificationCode = async (phoneNumber) => {
  try {
    const response = await fetch(`${API_BASE}/request-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),
    });

    if (!response.ok) {
      console.error('API error:', response.statusText);
      return { success: false, error: 'Server error' };
    }

    return await response.json();
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error' };
  }
};

export const verifyCode = async (phoneNumber, code) => {
  try {
    const response = await fetch(`${API_BASE}/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, code }),
    });

    if (!response.ok) {
      console.error('API error:', response.statusText);
      return { success: false, error: 'Server error' };
    }

    return await response.json();
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error' };
  }
};

// ✅ New: Fetch user profile
export const fetchUserProfile = async () => {
  try {
    const response = await fetch(PROFILE_API_BASE, { method: 'GET' });
    if (!response.ok) throw new Error('Failed to load profile');

    const data = await response.json();
    return data.profile;  // ✅ Return just the profile object!
  } catch (error) {
    console.error('❌ Failed to load profile:', error);
    throw error;
  }
};

// ✅ New: Update user profile
export const updateUserProfile = async (profile) => {
  try {
    const response = await fetch(PROFILE_API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    });

    if (!response.ok) throw new Error('Failed to update profile');
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to update profile:', error);
    throw error;
  }
};
