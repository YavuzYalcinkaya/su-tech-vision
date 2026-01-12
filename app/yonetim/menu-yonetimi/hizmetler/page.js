"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";
import serviceMenuService from "../../../services/serviceMenuService";

export default function HizmetlerYonetimiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null, title: '', type: '' });
  const [updateModal, setUpdateModal] = useState({ isOpen: false, id: null, data: null, type: '' });
  const [createModal, setCreateModal] = useState({ isOpen: false });
  const [createPageModal, setCreatePageModal] = useState({ isOpen: false, menuId: null, menuTitle: '' });
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingPage, setIsCreatingPage] = useState(false);
  
  // Create form state
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    active: true,
    image: null,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
  });
  
  // Image previews
  const [imagePreviews, setImagePreviews] = useState({
    image: null,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
  });

  // Create page form state
  const [createPageForm, setCreatePageForm] = useState({
    title: '',
    description: '',
    active: true,
    image: null,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
  });
  
  // Page image previews
  const [pageImagePreviews, setPageImagePreviews] = useState({
    image: null,
    imageUrl1: null,
    imageUrl2: null,
    imageUrl3: null,
    imageUrl4: null,
    imageUrl5: null,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

const handleDelete = async () => {
    if (!deleteModal.id) return;

    setIsDeleting(true);
    try {
      if (deleteModal.type === 'menu') {
        // Delete menu - DELETE /internal/service-menus/{id}
        await serviceMenuService.deleteServiceMenu(deleteModal.id);
        showToast(`"${deleteModal.title}" menüsü başarıyla silindi`, 'success');
      } else {
        // Delete page - DELETE /internal/service-pages/{id}
        await serviceMenuService.deleteServicePage(deleteModal.id);
        showToast(`"${deleteModal.title}" alt sayfası başarıyla silindi`, 'success');
      }
      setDeleteModal({ isOpen: false, id: null, title: '', type: '' });
      fetchServices();
    } catch (error) {
      console.error('Delete error:', error);
      showToast(error.message || 'Silme işlemi başarısız oldu', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

const handleUpdate = async () => {
    if (!updateModal.id || !updateModal.data) return;

    setIsUpdating(true);
    try {
      if (updateModal.type === 'menu') {
        // Update menu - PUT /internal/service-menus/{id}
        await serviceMenuService.updateServiceMenu(updateModal.id, updateModal.data);
        showToast(`"${updateModal.data.title}" menüsü başarıyla güncellendi`, 'success');
      } else {
        // Update page - PUT /internal/service-pages/{id}
        await serviceMenuService.updateServicePage(updateModal.id, updateModal.data);
        showToast(`"${updateModal.data.title}" alt sayfası başarıyla güncellendi`, 'success');
      }
      setUpdateModal({ isOpen: false, id: null, data: null, type: '' });
      fetchServices();
    } catch (error) {
      console.error('Update error:', error);
      showToast(error.message || 'Güncelleme işlemi başarısız oldu', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageChange = (field, file) => {
    if (file) {
      setCreateForm(prev => ({ ...prev, [field]: file }));
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreviews(prev => ({ ...prev, [field]: previewUrl }));
    }
  };

  const removeImage = (field) => {
    setCreateForm(prev => ({ ...prev, [field]: null }));
    if (imagePreviews[field]) {
      URL.revokeObjectURL(imagePreviews[field]);
    }
    setImagePreviews(prev => ({ ...prev, [field]: null }));
  };

  const resetCreateForm = () => {
    setCreateForm({
      title: '',
      description: '',
      active: true,
      image: null,
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      imageUrl5: null,
    });
    // Clean up preview URLs
    Object.values(imagePreviews).forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
    setImagePreviews({
      image: null,
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      imageUrl5: null,
    });
  };

  const handleCreate = async () => {
    if (!createForm.title.trim()) {
      showToast('Başlık alanı zorunludur', 'error');
      return;
    }
    
    setIsCreating(true);
    try {
      const menuData = {
        title: createForm.title,
        description: createForm.description,
        active: createForm.active,
      };
      
      const additionalImages = [
        createForm.imageUrl1,
        createForm.imageUrl2,
        createForm.imageUrl3,
        createForm.imageUrl4,
        createForm.imageUrl5,
      ];
      
      await serviceMenuService.createServiceMenu(menuData, createForm.image, additionalImages);
      showToast(`"${createForm.title}" başarıyla oluşturuldu`, 'success');
      setCreateModal({ isOpen: false });
      resetCreateForm();
      fetchServices();
    } catch (error) {
      console.error('Create error:', error);
      showToast(error.message || 'Oluşturma işlemi başarısız oldu', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  // Page image handlers
  const handlePageImageChange = (field, file) => {
    if (file) {
      setCreatePageForm(prev => ({ ...prev, [field]: file }));
      const previewUrl = URL.createObjectURL(file);
      setPageImagePreviews(prev => ({ ...prev, [field]: previewUrl }));
    }
  };

  const removePageImage = (field) => {
    setCreatePageForm(prev => ({ ...prev, [field]: null }));
    if (pageImagePreviews[field]) {
      URL.revokeObjectURL(pageImagePreviews[field]);
    }
    setPageImagePreviews(prev => ({ ...prev, [field]: null }));
  };

  const resetCreatePageForm = () => {
    setCreatePageForm({
      title: '',
      description: '',
      active: true,
      image: null,
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      imageUrl5: null,
    });
    Object.values(pageImagePreviews).forEach(url => {
      if (url) URL.revokeObjectURL(url);
    });
    setPageImagePreviews({
      image: null,
      imageUrl1: null,
      imageUrl2: null,
      imageUrl3: null,
      imageUrl4: null,
      imageUrl5: null,
    });
  };

  const handleCreatePage = async () => {
    if (!createPageForm.title.trim()) {
      showToast('Başlık alanı zorunludur', 'error');
      return;
    }

    setIsCreatingPage(true);
    try {
      const pageData = {
        title: createPageForm.title,
        description: createPageForm.description,
        active: createPageForm.active,
      };

      const additionalImages = [
        createPageForm.imageUrl1,
        createPageForm.imageUrl2,
        createPageForm.imageUrl3,
        createPageForm.imageUrl4,
        createPageForm.imageUrl5,
      ];

      await serviceMenuService.createServicePage(createPageModal.menuId, pageData, createPageForm.image, additionalImages);
      showToast(`"${createPageForm.title}" alt sayfası başarıyla oluşturuldu`, 'success');
      setCreatePageModal({ isOpen: false, menuId: null, menuTitle: '' });
      resetCreatePageForm();
      fetchServices();
    } catch (error) {
      console.error('Create page error:', error);
      showToast(error.message || 'Alt sayfa oluşturma başarısız oldu', 'error');
    } finally {
      setIsCreatingPage(false);
    }
  };

  const openCreatePageModal = (menuId, menuTitle, e) => {
    e.stopPropagation();
    setCreatePageModal({ isOpen: true, menuId, menuTitle });
  };

  const openDeleteModal = (id, title, type, e) => {
    e.stopPropagation();
    setDeleteModal({ isOpen: true, id, title, type });
  };

  const openUpdateModal = (id, data, type, e) => {
    e.stopPropagation();
    setUpdateModal({ isOpen: true, id, data: { ...data }, type });
  };

  useEffect(() => {
    const checkAdmin = () => {
      if (typeof window !== 'undefined') {
        const role = localStorage.getItem('userRole');
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          router.push('/giris');
          return false;
        }
        
        if (role !== 'ADMIN') {
          router.push('/');
          return false;
        }
        return true;
      }
      return false;
    };

    if (checkAdmin()) {
      fetchServices();
    }
  }, [router]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const data = await serviceMenuService.getServiceMenusWithPages();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      showToast(error.message || 'Hizmetler yüklenirken bir hata oluştu', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-grid flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-slate-400">Hizmetler yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12 bg-grid">
      <div className="absolute inset-0 bg-radial"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hizmetler Yönetimi</h1>
              <p className="text-slate-400 mt-1">Hizmetlerimiz sayfasının içeriğini görüntüleyin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchServices}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Yenile
            </button>
            <button
              onClick={() => setCreateModal({ isOpen: true })}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/25"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Hizmet Ekle
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="glass rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{services.length}</p>
                <p className="text-sm text-slate-400">Toplam Menü</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{services.filter(s => s.active).length}</p>
                <p className="text-sm text-slate-400">Aktif Menü</p>
              </div>
            </div>
          </div>
          <div className="glass rounded-xl p-4 border border-slate-700">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {services.reduce((acc, s) => acc + (s.pages?.length || 0), 0)}
                </p>
                <p className="text-sm text-slate-400">Toplam Sayfa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Services List */}
        {services.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center border border-slate-700">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Henüz Hizmet Yok</h3>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="glass rounded-xl border border-slate-700 overflow-hidden"
              >
                {/* Service Header */}
                <div 
                  className="p-6 cursor-pointer hover:bg-slate-800/30 transition-colors"
                  onClick={() => toggleMenu(service.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{service.id}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{service.title}</h3>
                        <p className="text-slate-400 text-sm mt-1">{service.description}</p>
                      </div>
                    </div>
<div className="flex items-center gap-4">
                      {/* Add Sub Page Button */}
                      <button
                        onClick={(e) => openCreatePageModal(service.id, service.title, e)}
                        className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors"
                        title="Alt Sayfa Ekle"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                      {/* Update Button for Menu */}
                      <button
                        onClick={(e) => openUpdateModal(service.id, {
                          title: service.title,
                          description: service.description,
                          active: service.active
                        }, 'menu', e)}
                        className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                        title="Güncelle"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      {/* Delete Button for Menu */}
                      <button
                        onClick={(e) => openDeleteModal(service.id, service.title, 'menu', e)}
                        className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                        title="Sil"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        service.active 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {service.active ? 'Aktif' : 'Pasif'}
                      </span>
                      <div className="flex items-center gap-2 text-slate-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm">{service.pages?.length || 0} sayfa</span>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
                          expandedMenus[service.id] ? 'rotate-180' : ''
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Pages List (Expandable) */}
                {expandedMenus[service.id] && (
                  <div className="border-t border-slate-700 bg-slate-900/30">
                    {service.pages && service.pages.length > 0 ? (
                      <div className="divide-y divide-slate-700/50">
                        {service.pages.map((page, index) => (
                          <div key={page.id} className="p-4 pl-20 hover:bg-slate-800/20 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-sm text-slate-300">{index + 1}</span>
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">{page.title}</h4>
                                  {page.content && (
                                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                      {page.content}
                                    </p>
                                  )}
                                  {page.images && page.images.length > 0 && (
                                    <div className="flex items-center gap-1 mt-2 text-xs text-slate-500">
                                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                      <span>{page.images.length} görsel</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {/* Update Button for Page */}
                                <button
                                  onClick={(e) => openUpdateModal(page.id, { 
                                    title: page.title, 
                                    content: page.content || '', 
                                    active: page.active 
                                  }, 'page', e)}
                                  className="p-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors"
                                  title="Güncelle"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                {/* Delete Button for Page */}
                                <button
                                  onClick={(e) => openDeleteModal(page.id, page.title, 'page', e)}
                                  className="p-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
                                  title="Sil"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  page.active 
                                    ? 'bg-green-500/20 text-green-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {page.active ? 'Aktif' : 'Pasif'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 pl-20 text-center">
                        <p className="text-slate-500 text-sm">Bu menüye ait sayfa bulunmuyor.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 max-w-md w-full border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Silme Onayı</h3>
                <p className="text-slate-400 text-sm">Bu işlem geri alınamaz</p>
              </div>
            </div>
            <p className="text-slate-300 mb-6">
              <span className="font-semibold text-white">&quot;{deleteModal.title}&quot;</span> {deleteModal.type === 'menu' ? 'menüsünü' : 'sayfasını'} silmek istediğinizden emin misiniz?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, id: null, title: '', type: '' })}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                disabled={isDeleting}
              >
                İptal
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Siliniyor...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Sil
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {updateModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass rounded-2xl p-6 max-w-lg w-full border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {updateModal.type === 'menu' ? 'Menü Güncelle' : 'Sayfa Güncelle'}
                </h3>
                <p className="text-slate-400 text-sm">Bilgileri düzenleyin</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Başlık</label>
                <input
                  type="text"
                  value={updateModal.data?.title || ''}
                  onChange={(e) => setUpdateModal(prev => ({
                    ...prev,
                    data: { ...prev.data, title: e.target.value }
                  }))}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Başlık girin"
                />
              </div>
              
              {updateModal.type === 'menu' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                  <textarea
                    value={updateModal.data?.description || ''}
                    onChange={(e) => setUpdateModal(prev => ({
                      ...prev,
                      data: { ...prev.data, description: e.target.value }
                    }))}
                    rows={3}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="Açıklama girin"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">İçerik</label>
                  <textarea
                    value={updateModal.data?.content || ''}
                    onChange={(e) => setUpdateModal(prev => ({
                      ...prev,
                      data: { ...prev.data, content: e.target.value }
                    }))}
                    rows={4}
                    className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                    placeholder="İçerik girin"
                  />
                </div>
              )}
              
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={updateModal.data?.active || false}
                    onChange={(e) => setUpdateModal(prev => ({
                      ...prev,
                      data: { ...prev.data, active: e.target.checked }
                    }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
                <span className="text-slate-300 text-sm">Aktif</span>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setUpdateModal({ isOpen: false, id: null, data: null, type: '' })}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                disabled={isUpdating}
              >
                İptal
              </button>
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="flex-1 px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isUpdating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Güncelleniyor...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Güncelle
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {createModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass rounded-2xl p-6 max-w-2xl w-full border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Yeni Hizmet Ekle</h3>
                <p className="text-slate-400 text-sm">Hizmetlerimiz sayfasına yeni bir hizmet ekleyin</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Başlık <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={createForm.title}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  placeholder="Hizmet başlığı girin"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                <textarea
                  value={createForm.description}
                  onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  placeholder="Hizmet açıklaması girin"
                />
              </div>
              
              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createForm.active}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, active: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
                <span className="text-slate-300 text-sm">Aktif</span>
              </div>
              
              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ana Görsel</label>
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 hover:border-cyan-500/50 transition-colors">
                  {imagePreviews.image ? (
                    <div className="relative">
                      <img src={imagePreviews.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removeImage('image')}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                      <svg className="w-10 h-10 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-slate-400 text-sm">Görsel seçmek için tıklayın</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange('image', e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              
              {/* Additional Images */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ek Görseller</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4', 'imageUrl5'].map((field, index) => (
                    <div key={field} className="border-2 border-dashed border-slate-700 rounded-xl p-2 hover:border-cyan-500/50 transition-colors">
                      {imagePreviews[field] ? (
                        <div className="relative">
                          <img src={imagePreviews[field]} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removeImage(field)}
                            className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                          <svg className="w-6 h-6 text-slate-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-slate-500 text-xs">Görsel {index + 1}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(field, e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCreateModal({ isOpen: false });
                  resetCreateForm();
                }}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                disabled={isCreating}
              >
                İptal
              </button>
              <button
                onClick={handleCreate}
                disabled={isCreating}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isCreating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Oluştur
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Page Modal */}
      {createPageModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="glass rounded-2xl p-6 max-w-2xl w-full border border-slate-700 my-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Alt Sayfa Ekle</h3>
                <p className="text-slate-400 text-sm">&quot;{createPageModal.menuTitle}&quot; menüsüne alt sayfa ekleyin</p>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Başlık <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={createPageForm.title}
                  onChange={(e) => setCreatePageForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-green-400 transition-colors"
                  placeholder="Alt sayfa başlığı girin"
                />
              </div>
              
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                <textarea
                  value={createPageForm.description}
                  onChange={(e) => setCreatePageForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-green-400 transition-colors resize-none"
                  placeholder="Alt sayfa açıklaması girin"
                />
              </div>
              
              {/* Active Toggle */}
              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={createPageForm.active}
                    onChange={(e) => setCreatePageForm(prev => ({ ...prev, active: e.target.checked }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                </label>
                <span className="text-slate-300 text-sm">Aktif</span>
              </div>
              
              {/* Main Image */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ana Görsel</label>
                <div className="border-2 border-dashed border-slate-700 rounded-xl p-4 hover:border-green-500/50 transition-colors">
                  {pageImagePreviews.image ? (
                    <div className="relative">
                      <img src={pageImagePreviews.image} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                      <button
                        type="button"
                        onClick={() => removePageImage('image')}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                      <svg className="w-10 h-10 text-slate-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-slate-400 text-sm">Görsel seçmek için tıklayın</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handlePageImageChange('image', e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              
              {/* Additional Images */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ek Görseller</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {['imageUrl1', 'imageUrl2', 'imageUrl3', 'imageUrl4', 'imageUrl5'].map((field, index) => (
                    <div key={field} className="border-2 border-dashed border-slate-700 rounded-xl p-2 hover:border-green-500/50 transition-colors">
                      {pageImagePreviews[field] ? (
                        <div className="relative">
                          <img src={pageImagePreviews[field]} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            onClick={() => removePageImage(field)}
                            className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center cursor-pointer py-4">
                          <svg className="w-6 h-6 text-slate-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          <span className="text-slate-500 text-xs">Görsel {index + 1}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handlePageImageChange(field, e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCreatePageModal({ isOpen: false, menuId: null, menuTitle: '' });
                  resetCreatePageForm();
                }}
                className="flex-1 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                disabled={isCreatingPage}
              >
                İptal
              </button>
              <button
                onClick={handleCreatePage}
                disabled={isCreatingPage}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                {isCreatingPage ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Oluştur
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
