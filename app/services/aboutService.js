import { API_BASE_URL } from '../config/api';

/**
 * About Service
 * Handles all "About Us" page content management API calls
 */
class AboutService {
  /**
   * Create or update About Us content
   * @param {Object} data - About content data
   * @param {string} data.title - Title
   * @param {string} data.description - Description
   * @returns {Promise<Object>} Response data
   */
  async saveAboutContent(data) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Saving about content:', data); // Debug

      // Always use ID 3 for about content
      const response = await fetch(`${API_BASE_URL}/internal/about/3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status); // Debug

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Bu işlem için yetkiniz yok');
        } else if (response.status === 400) {
          throw new Error(errorData.message || 'Geçersiz veri formatı');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'İçerik kaydedilemedi');
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('About content saved successfully:', responseData); // Debug
        return responseData;
      } else {
        // No content or empty response - return success message
        console.log('About content saved successfully (no response body)'); // Debug
        return { success: true, message: 'İçerik başarıyla kaydedildi' };
      }
    } catch (error) {
      console.error('Save about content error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Get About Us content
   * @returns {Promise<Object>} About content data
   */
  async getAboutContent() {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/about`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No content yet, return default
          return null;
        }
        throw new Error('İçerik yüklenemedi');
      }

      const data = await response.json();
      console.log('About content loaded:', data); // Debug
      return data;
    } catch (error) {
      console.error('Get about content error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Get About Us content from internal API (ID 3)
   * @returns {Promise<Object>} About content data
   */
  async getAboutContentById() {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/about/3`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No content yet, return default
          return null;
        }
        throw new Error('İçerik yüklenemedi');
      }

      const data = await response.json();
      console.log('About content loaded by ID:', data); // Debug
      return data;
    } catch (error) {
      console.error('Get about content by ID error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Update About Us content
   * @param {number} id - Content ID
   * @param {Object} data - About content data
   * @param {string} data.title - Title
   * @param {string} data.description - Description
   * @returns {Promise<Object>} Response data
   */
  async updateAboutContent(id, data) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Updating about content:', id, data); // Debug

      const response = await fetch(`${API_BASE_URL}/internal/about/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: JSON.stringify(data),
      });

      console.log('Response status:', response.status); // Debug

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Bu işlem için yetkiniz yok');
        } else if (response.status === 400) {
          throw new Error(errorData.message || 'Geçersiz veri formatı');
        } else if (response.status === 404) {
          throw new Error('İçerik bulunamadı');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'İçerik güncellenemedi');
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('About content updated successfully:', responseData); // Debug
        return responseData;
      } else {
        // No content or empty response - return success message
        console.log('About content updated successfully (no response body)'); // Debug
        return { success: true, message: 'İçerik başarıyla güncellendi' };
      }
    } catch (error) {
      console.error('Update about content error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Delete About Us content
   * @param {number} id - Content ID
   * @returns {Promise<Object>} Response data
   */
  async deleteAboutContent(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Deleting about content:', id); // Debug

      const response = await fetch(`${API_BASE_URL}/internal/about/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      console.log('Response status:', response.status); // Debug

      // 204 No Content is a success status for DELETE
      if (response.status === 204) {
        console.log('About content deleted successfully (204 No Content)'); // Debug
        return { success: true, message: 'İçerik başarıyla silindi' };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Bu işlem için yetkiniz yok');
        } else if (response.status === 404) {
          throw new Error('İçerik bulunamadı');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'İçerik silinemedi');
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('About content deleted successfully:', responseData); // Debug
        return responseData;
      } else {
        // No content or empty response - return success message
        console.log('About content deleted successfully (no response body)'); // Debug
        return { success: true, message: 'İçerik başarıyla silindi' };
      }
    } catch (error) {
      console.error('Delete about content error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }
}

const aboutService = new AboutService();
export default aboutService;

