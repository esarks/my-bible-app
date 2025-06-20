
export const saveUserProfile = async (profile) => {
  try {
    const response = await fetch('/api/user-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    return { success: false, error: 'Network error' };
  }
};

export const loadUserProfile = async () => {
  try {
    const response = await fetch('/api/user-profile');
    return await response.json();
  } catch (error) {
    console.error('API error:', error);
    return { success: false, error: 'Network error' };
  }
};
