const API_BASE = 'http://localhost:8080/api/auth';

export const requestVerificationCode = async (phoneNumber) => {
  try {
    const response = await fetch(`${API_BASE}/request-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber }),  // ✅ Only phoneNumber!
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
