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
        
        // Provide user-friendly error messages based on status code
        if (response.status === 401 || response.status === 403) {
          throw new Error('Kullanıcı adı veya şifre hatalı.');
        } else if (response.status === 404) {
          throw new Error('Kullanıcı bulunamadı.');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'Giriş işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edin.');
      }

      const data = await response.json();
      
      // Store token and user info
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userId', data.id);
        localStorage.setItem('userRole', data.role);
        localStorage.setItem('username', data.username);
      }

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Sign up new user
   * @param {Object} userData - User registration data
   * @param {string} userData.surname - User surname
   * @param {string} userData.username - Username
   * @param {string} userData.password - Password
   * @param {string} userData.email - Email address
   * @param {string} userData.phone - Phone number
   * @param {string} userData.createTime - Creation time (YYYY-MM-DD format)
   * @param {boolean} userData.isActive - Is user active
   * @param {string} userData.role - User role (ADMIN, USER, etc.)
   * @returns {Promise<Object>} Response data containing user info
   */
  async signUp(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/authentication/sign-up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Provide user-friendly error messages based on status code
        if (response.status === 409) {
          throw new Error('Bu kullanıcı adı veya e-posta adresi zaten kullanılıyor.');
        } else if (response.status === 400) {
          throw new Error('Lütfen tüm alanları doğru şekilde doldurun.');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'Kayıt işlemi başarısız oldu. Lütfen bilgilerinizi kontrol edin.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      
      // Handle network errors
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
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
    localStorage.removeItem('username');
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

  /**
   * Get all users (Admin only)
   * @returns {Promise<Array>} List of all users
   */
  async getAllUsers() {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Using Internal API Key'); // Debug

      const response = await fetch(`${API_BASE_URL}/internal/userAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      console.log('Response status:', response.status); // Debug

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Bu işlem için yetkiniz yok');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'Kullanıcılar yüklenemedi');
      }

      const data = await response.json();
      console.log('Users data:', data); // Debug
      return data;
    } catch (error) {
      console.error('Get all users error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }
}

const authService = new AuthService();
export default authService;

