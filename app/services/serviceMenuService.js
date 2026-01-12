import { API_BASE_URL } from '../config/api';

/**
 * Service Menu Service
 * Handles all service menu API calls
 */
class ServiceMenuService {
  /**
   * Get all service menus with their pages
   * @returns {Promise<Array>} Service menus with pages
   */
  async getServiceMenusWithPages() {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/service-menus/with-pages`, {
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
        throw new Error('Hizmet menüleri yüklenemedi');
      }

      const data = await response.json();
      console.log('Service menus loaded:', data);
      return data;
    } catch (error) {
      console.error('Get service menus error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Get a specific service menu by ID with its pages
   * @param {number} menuId - Menu ID
   * @returns {Promise<Object>} Service menu with pages
   */
  async getServiceMenuById(menuId) {
    try {
      const menus = await this.getServiceMenusWithPages();
      const menu = menus.find(m => m.id === parseInt(menuId));
      
      if (!menu) {
        return null;
      }
      
      return menu;
    } catch (error) {
      console.error('Get service menu by ID error:', error);
      throw error;
    }
  }

  /**
   * Get a specific service page by menu ID and page ID
   * @param {number} menuId - Menu ID
   * @param {number} pageId - Page ID
   * @returns {Promise<Object>} Service page data with menu info
   */
  async getServicePage(menuId, pageId) {
    try {
      const menu = await this.getServiceMenuById(menuId);
      
      if (!menu) {
        return null;
      }
      
      const page = menu.pages?.find(p => p.id === parseInt(pageId));
      
      if (!page) {
        return null;
      }
      
      return {
        menu: {
          id: menu.id,
          title: menu.title,
          description: menu.description,
        },
        page: page,
      };
    } catch (error) {
      console.error('Get service page error:', error);
      throw error;
    }
  }

  /**
   * Delete a service menu by ID
   * @param {number} id - Service menu ID
   * @returns {Promise<void>}
   */
  async deleteServiceMenu(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/service-menus/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Menü silme işlemi başarısız oldu');
      }

      return true;
    } catch (error) {
      console.error('Delete service menu error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Delete a service page by ID
   * @param {number} id - Service page ID
   * @returns {Promise<void>}
   */
  async deleteServicePage(id) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/service-pages/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error('Alt sayfa silme işlemi başarısız oldu');
      }

      return true;
    } catch (error) {
      console.error('Delete service page error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Create a new service menu with images
   * @param {Object} menuData - Menu data { title, description, active }
   * @param {File} image - Main image file
   * @param {File[]} additionalImages - Additional image files (imageUrl1-5)
   * @returns {Promise<Object>} Created service menu
   */
  async createServiceMenu(menuData, image, additionalImages = []) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;

      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const formData = new FormData();
      
      // Add menu data as JSON string with correct content type
      const menuBlob = new Blob([JSON.stringify({
        title: menuData.title,
        description: menuData.description,
        active: menuData.active
      })], { type: 'application/json' });
      formData.append('menu', menuBlob);
      
      // Add main image if provided - create new File with correct type
      if (image) {
        const imageType = image.type || 'image/jpeg';
        const fileName = image.name || 'image.jpg';
        const newFile = new File([image], fileName, { type: imageType });
        formData.append('image', newFile);
      }
      
      // Add additional images (imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5)
      additionalImages.forEach((img, index) => {
        if (img && index < 5) {
          const imgType = img.type || 'image/jpeg';
          const fileName = img.name || `image${index + 1}.jpg`;
          const newFile = new File([img], fileName, { type: imgType });
          formData.append(`imageUrl${index + 1}`, newFile);
        }
      });

      console.log('Creating service menu with FormData');

      const response = await fetch(`${API_BASE_URL}/internal/service-menus`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Hizmet oluşturma başarısız oldu');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Create service menu error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Create a new service page under a menu
   * @param {number} menuId - Menu ID to add the page to
   * @param {Object} pageData - Page data { title, description, active }
   * @param {File} image - Main image file
   * @param {File[]} additionalImages - Additional image files (imageUrl1-5)
   * @returns {Promise<Object>} Created service page
   */
  async createServicePage(menuId, pageData, image, additionalImages = []) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;

      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const formData = new FormData();
      
      // Add page data as JSON string with correct content type
      const menuBlob = new Blob([JSON.stringify({
        title: pageData.title,
        description: pageData.description,
        active: pageData.active
      })], { type: 'application/json' });
      formData.append('menu', menuBlob);
      
      // Add main image if provided - create new File with correct type
      if (image) {
        const imageType = image.type || 'image/jpeg';
        const fileName = image.name || 'image.jpg';
        const newFile = new File([image], fileName, { type: imageType });
        formData.append('image', newFile);
      }
      
      // Add additional images (imageUrl1, imageUrl2, imageUrl3, imageUrl4, imageUrl5)
      additionalImages.forEach((img, index) => {
        if (img && index < 5) {
          const imgType = img.type || 'image/jpeg';
          const fileName = img.name || `image${index + 1}.jpg`;
          const newFile = new File([img], fileName, { type: imgType });
          formData.append(`imageUrl${index + 1}`, newFile);
        }
      });

      console.log('Creating service page with FormData');

      const response = await fetch(`${API_BASE_URL}/internal/service-pages/menu/${menuId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: formData,
      });

      console.log('Response status:', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Alt sayfa oluşturma başarısız oldu');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Create service page error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Update a service menu by ID
   * @param {number} id - Service menu ID
   * @param {Object} data - Updated service menu data { title, description, active }
   * @returns {Promise<Object>} Updated service menu
   */
  async updateServiceMenu(id, data) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/service-menus/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Menü güncelleme işlemi başarısız oldu');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Update service menu error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }

  /**
   * Update a service page by ID
   * @param {number} id - Service page ID
   * @param {Object} data - Updated service page data
   * @returns {Promise<Object>} Updated service page
   */
  async updateServicePage(id, data) {
    try {
      const internalApiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
      
      if (!internalApiKey) {
        throw new Error('Internal API key yapılandırılmamış');
      }

      const response = await fetch(`${API_BASE_URL}/internal/service-pages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${internalApiKey}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Alt sayfa güncelleme işlemi başarısız oldu');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Update service page error:', error);
      
      if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
        throw new Error('Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.');
      }
      
      throw error;
    }
  }
}

const serviceMenuService = new ServiceMenuService();
export default serviceMenuService;

