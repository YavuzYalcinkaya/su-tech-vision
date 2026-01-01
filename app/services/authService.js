import { API_BASE_URL } from '../config/api';

/**
 * Authentication Service
 * Handles all authentication related API calls
 */
class AuthService {
  /**
   * Sign in user
   * @param {Object} credentials - User credentials
   * @param {string} credentials.username - Username
   * @param {string} credentials.password - Password
   * @returns {Promise<Object>} Response data containing user info and token
   */
  async signIn(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/authentication/sign-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Giriş başarısız oldu');
      }

      const data = await response.json();
      
      // Store token if needed
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userRole', data.role);
      }

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  /**
   * Sign out user
   */
  signOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }

  /**
   * Get current auth token
   * @returns {string|null} Current token
   */
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} True if user is authenticated
   */
  isAuthenticated() {
    return !!this.getToken();
  }

  /**
   * Get current user info
   * @returns {Object|null} User info
   */
  getCurrentUser() {
    if (typeof window !== 'undefined') {
      const token = this.getToken();
      const userId = localStorage.getItem('userId');
      const userRole = localStorage.getItem('userRole');
      
      if (token && userId) {
        return {
          id: parseInt(userId),
          role: userRole,
          token,
        };
      }
    }
    return null;
  }
}

const authService = new AuthService();
export default authService;

