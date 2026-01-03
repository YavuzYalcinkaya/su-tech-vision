import { API_BASE_URL } from '../config/api';

/**
 * User Service
 * Handles all user management related API calls
 */
class UserService {
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

      console.log('Fetching all users...'); // Debug

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
      console.log('Users loaded:', data.length, 'users'); // Debug
      return data;
    } catch (error) {
      console.error('Get all users error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Get user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object>} User data
   */
  async getUserById(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/user/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Kullanıcı bulunamadı');
      }

      return await response.json();
    } catch (error) {
      console.error('Get user by ID error:', error);
      throw error;
    }
  }

  /**
   * Update user
   * @param {number} id - User ID
   * @param {Object} userData - Updated user data
   * @returns {Promise<Object>} Updated user data
   */
  async updateUser(id, userData) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Kullanıcı güncellenemedi');
      }

      return await response.json();
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  /**
   * Delete user
   * @param {number} id - User ID
   * @returns {Promise<void>}
   */
  async deleteUser(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/user/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Kullanıcı silinemedi');
      }

      return true;
    } catch (error) {
      console.error('Delete user error:', error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;

