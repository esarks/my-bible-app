const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';  // fallback for dev

const API_BASE = `${BASE_URL}/api/auth`;
const PROFILE_API_BASE = `${BASE_URL}/api/user-profile`;

// ✅ Track the verified phone number
let verifiedPhoneNumber = null;

export const setVerifiedPhoneNumber = (number) => {
  verifiedPhoneNumber = number;
  localStorage.setItem('verifiedPhoneNumber', number);
};

export const getVerifiedPhoneNumber = () => {
  return verifiedPhoneNumber || localStorage.getItem('verifiedPhoneNumber');
};

// ✅ Request verification code
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

// ✅ Verify code and store phone number if successful
export const verifyCode = async (phoneNumber, code) => {
  try {
    const response = await fetch(`${API_BASE}/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, code }),
    });

    const result = await response.json();
    if (result.success) {
      setVerifiedPhoneNumber(phoneNumber);
    }

    return result;
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error' };
  }
};

// ✅ Fetch user profile with phone number query param
export const fetchUserProfile = async () => {
  try {
    const phoneNumber = getVerifiedPhoneNumber();
    if (!phoneNumber) throw new Error('Phone number not verified');

    const response = await fetch(`${PROFILE_API_BASE}?phoneNumber=${encodeURIComponent(phoneNumber)}`, {
      method: 'GET'
    });

    if (!response.ok) throw new Error('Failed to load profile');
    const data = await response.json();
    return data.profile;
  } catch (error) {
    console.error('❌ Failed to load profile:', error);
    throw error;
  }
};

// ✅ Update user profile using verified phone number
export const updateUserProfile = async (profile) => {
  try {
    const phoneNumber = getVerifiedPhoneNumber();
    if (!phoneNumber) throw new Error('Phone number not verified');

    const response = await fetch(PROFILE_API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...profile, phoneNumber }),
    });

    if (!response.ok) throw new Error('Failed to update profile');
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to update profile:', error);
    throw error;
  }
};
