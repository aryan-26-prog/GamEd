import { apiCall, setAuthToken, removeAuthToken } from '../utils/api';

export const authService = {
  // Register user
  register: async (userData) => {
    const response = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Login user
  login: async (credentials) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.token) {
      setAuthToken(response.token);
    }
    
    return response;
  },

  // Get current user
  getCurrentUser: async () => {
    return await apiCall('/auth/me');
  },

  // Logout
  logout: () => {
    removeAuthToken();
  },
};