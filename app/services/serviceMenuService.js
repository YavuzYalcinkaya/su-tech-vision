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
}

const serviceMenuService = new ServiceMenuService();
export default serviceMenuService;

