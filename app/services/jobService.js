import { API_BASE_URL } from '../config/api';

/**
 * Job Service
 * Handles all job posting management API calls
 */
class JobService {
  /**
   * Create a new job posting
   * @param {Object} data - Job data
   * @returns {Promise<Object>} Response data
   */
  async createJob(data) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Creating job:', data); // Debug

      const response = await fetch(`${API_BASE_URL}/internal/jobs`, {
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
        
        throw new Error(errorData.message || 'İlan oluşturulamadı');
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('Job created successfully:', responseData); // Debug
        return responseData;
      } else {
        // No content or empty response - return success message
        console.log('Job created successfully (no response body)'); // Debug
        return { success: true, message: 'İlan başarıyla oluşturuldu' };
      }
    } catch (error) {
      console.error('Create job error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Get all job postings
   * @returns {Promise<Array>} Array of jobs
   */
  async getAllJobs() {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/jobs`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }
        throw new Error('İlanlar yüklenemedi');
      }

      const data = await response.json();
      console.log('Jobs loaded:', data); // Debug
      return data;
    } catch (error) {
      console.error('Get jobs error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Get a specific job by ID
   * @param {number} id - Job ID
   * @returns {Promise<Object>} Job data
   */
  async getJobById(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/jobs/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('İlan bulunamadı');
        }
        throw new Error('İlan yüklenemedi');
      }

      const data = await response.json();
      console.log('Job loaded:', data); // Debug
      return data;
    } catch (error) {
      console.error('Get job error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Update a job posting
   * @param {number} id - Job ID
   * @param {Object} data - Job data
   * @returns {Promise<Object>} Response data
   */
  async updateJob(id, data) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Updating job:', id, data); // Debug

      const response = await fetch(`${API_BASE_URL}/internal/jobs/${id}`, {
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
          throw new Error('İlan bulunamadı');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'İlan güncellenemedi');
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('Job updated successfully:', responseData); // Debug
        return responseData;
      } else {
        // No content or empty response - return success message
        console.log('Job updated successfully (no response body)'); // Debug
        return { success: true, message: 'İlan başarıyla güncellendi' };
      }
    } catch (error) {
      console.error('Update job error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Delete a job posting
   * @param {number} id - Job ID
   * @returns {Promise<Object>} Response data
   */
  async deleteJob(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      console.log('Deleting job:', id); // Debug

      const response = await fetch(`${API_BASE_URL}/internal/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      console.log('Response status:', response.status); // Debug

      // 204 No Content is a success status for DELETE
      if (response.status === 204) {
        console.log('Job deleted successfully (204 No Content)'); // Debug
        return { success: true, message: 'İlan başarıyla silindi' };
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401 || response.status === 403) {
          throw new Error('Bu işlem için yetkiniz yok');
        } else if (response.status === 404) {
          throw new Error('İlan bulunamadı');
        } else if (response.status >= 500) {
          throw new Error('Sunucu hatası. Lütfen daha sonra tekrar deneyin.');
        }
        
        throw new Error(errorData.message || 'İlan silinemedi');
      }

      // Check if response has content
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        console.log('Job deleted successfully:', responseData); // Debug
        return responseData;
      } else {
        // No content or empty response - return success message
        console.log('Job deleted successfully (no response body)'); // Debug
        return { success: true, message: 'İlan başarıyla silindi' };
      }
    } catch (error) {
      console.error('Delete job error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }
}

const jobService = new JobService();
export default jobService;

