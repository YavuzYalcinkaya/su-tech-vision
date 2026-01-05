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

  const showToast = (message, type = "success") => {
    setToast({ message, type });
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
          <button
            onClick={fetchServices}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Yenile
          </button>
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
            <p className="text-slate-400">API'den herhangi bir hizmet verisi alınamadı.</p>
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
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                page.active 
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {page.active ? 'Aktif' : 'Pasif'}
                              </span>
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

        {/* Info Card */}
        <div className="mt-8 glass rounded-xl p-6 border border-slate-700">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-white font-medium mb-1">API Endpoint</h4>
              <p className="text-slate-400 text-sm">
                Bu veriler <code className="px-2 py-0.5 bg-slate-800 rounded text-cyan-400">/internal/service-menus/with-pages</code> endpoint'inden çekilmektedir.
              </p>
            </div>
          </div>
        </div>
      </div>

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
