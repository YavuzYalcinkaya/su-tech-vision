"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";

export default function HizmetlerYonetimiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([
    {
      id: 1,
      title: "Web Tasarım",
      description: "Modern ve responsive web siteleri tasarlıyoruz.",
      icon: "🎨",
      isActive: true,
    },
    {
      id: 2,
      title: "Mobil Uygulama",
      description: "iOS ve Android için mobil uygulamalar geliştiriyoruz.",
      icon: "📱",
      isActive: true,
    },
  ]);
  const [editingService, setEditingService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
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
          return;
        }
        
        if (role !== 'ADMIN') {
          router.push('/');
          return;
        }
      }
    };

    checkAdmin();
    setIsLoading(false);
  }, [router]);

  const handleEdit = (service) => {
    setEditingService({ ...service });
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingService({
      id: Date.now(),
      title: "",
      description: "",
      icon: "⭐",
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!editingService.title || !editingService.description) {
      showToast("Lütfen tüm alanları doldurun", "error");
      return;
    }

    setIsSaving(true);
    setTimeout(() => {
      const existingIndex = services.findIndex(s => s.id === editingService.id);
      if (existingIndex >= 0) {
        const updated = [...services];
        updated[existingIndex] = editingService;
        setServices(updated);
        showToast("Hizmet başarıyla güncellendi", "success");
      } else {
        setServices([...services, editingService]);
        showToast("Hizmet başarıyla eklendi", "success");
      }
      setIsModalOpen(false);
      setEditingService(null);
      setIsSaving(false);
    }, 500);
  };

  const handleDelete = (id) => {
    if (confirm("Bu hizmeti silmek istediğinize emin misiniz?")) {
      setServices(services.filter(s => s.id !== id));
      showToast("Hizmet silindi", "success");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-12 bg-grid flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
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
              <p className="text-slate-400 mt-1">Hizmetlerimiz sayfasının içeriğini yönetin</p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Yeni Hizmet
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">{service.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  service.isActive 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {service.isActive ? 'Aktif' : 'Pasif'}
                </span>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(service)}
                    className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Edit Modal */}
        {isModalOpen && editingService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass rounded-2xl max-w-2xl w-full border border-slate-700">
              <div className="p-6 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-white">
                  {services.find(s => s.id === editingService.id) ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle'}
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {/* Icon Emoji Picker */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    İkon (Emoji)
                  </label>
                  <input
                    type="text"
                    value={editingService.icon}
                    onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="🎨"
                    maxLength={2}
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Başlık
                  </label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    placeholder="Hizmet başlığı"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    placeholder="Hizmet açıklaması"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingService.isActive}
                    onChange={(e) => setEditingService({ ...editingService, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-300">
                    Aktif Hizmet
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-slate-700 flex gap-3 justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSaving}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    'Kaydet'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
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

