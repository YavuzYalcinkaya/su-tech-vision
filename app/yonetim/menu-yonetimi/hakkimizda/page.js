"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";
import ConfirmDialog from "../../../components/ConfirmDialog";
import aboutService from "../../../services/aboutService";

export default function HakkimizdaYonetimiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [content, setContent] = useState({
    id: null,
    title: "",
    description: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

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
    loadContent();
  }, [router]);

  const loadContent = async () => {
    try {
      const data = await aboutService.getAboutContentById();
      console.log('Loaded content:', data); // Debug
      if (data && (data.title || data.description)) {
        // If we have any content, set edit mode
        setContent({
          id: 3, // Always use ID 3 as per backend requirement
          title: data.title || "",
          description: data.description || "",
        });
        setIsEditMode(true); // We have existing content
        console.log('Edit mode activated'); // Debug
      } else {
        // No content, create mode
        setContent({
          id: null,
          title: "",
          description: "",
        });
        setIsEditMode(false); // New content
        console.log('Create mode activated'); // Debug
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Don't show error toast on initial load if no content exists
      setIsEditMode(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    // Validation
    if (!content.title.trim()) {
      showToast("Lütfen başlık girin", "error");
      return;
    }
    if (!content.description.trim()) {
      showToast("Lütfen açıklama girin", "error");
      return;
    }

    setIsSaving(true);
    try {
      const data = {
        title: content.title,
        description: content.description,
      };

      if (isEditMode) {
        // Update existing content (always use ID 3)
        await aboutService.updateAboutContent(3, data);
        showToast("İçerik başarıyla güncellendi", "success");
      } else {
        // Create new content
        await aboutService.saveAboutContent(data);
        showToast("İçerik başarıyla kaydedildi", "success");
        // Set edit mode and ID after creation
        setContent({ ...content, id: 3 });
        setIsEditMode(true);
      }
    } catch (error) {
      console.error('Save error:', error);
      showToast(error.message || "Kaydetme sırasında bir hata oluştu", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = () => {
    if (!isEditMode) {
      showToast("Silinecek içerik bulunamadı", "error");
      return;
    }

    setConfirmDialog({
      title: "İçeriği Sil",
      message: "Bu içeriği silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      onConfirm: async () => {
        setConfirmDialog(null);
        setIsSaving(true);
        try {
          await aboutService.deleteAboutContent(3); // Always use ID 3
          showToast("İçerik başarıyla silindi", "success");
          // Reset form
          setContent({
            id: null,
            title: "",
            description: "",
          });
          setIsEditMode(false);
        } catch (error) {
          console.error('Delete error:', error);
          showToast(error.message || "Silme sırasında bir hata oluştu", "error");
        } finally {
          setIsSaving(false);
        }
      },
      onCancel: () => setConfirmDialog(null),
    });
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
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Hakkımızda Yönetimi</h1>
              <p className="text-slate-400 mt-1">Hakkımızda sayfasının içeriğini yönetin</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Show delete button if we have content (either title or description exists) */}
            {(content.title || content.description) && (
              <button
                onClick={handleDelete}
                disabled={isSaving}
                className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Sil
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary px-6 py-3 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {(content.title || content.description) ? "Güncelleniyor..." : "Kaydediliyor..."}
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {(content.title || content.description) ? "Güncelle" : "Kaydet"}
                </>
              )}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {/* Main Content */}
          <div className="glass rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Hakkımızda İçeriği
              </h2>
              {(content.title || content.description) && (
                <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-medium rounded-full border border-green-500/30">
                  Mevcut İçerik
                </span>
              )}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Başlık <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  placeholder="Örn: Hakkımızda"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Açıklama <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  rows={6}
                  placeholder="Örn: Yeni nesil yazılım çözümleri sunuyoruz."
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all"
                />
                <p className="mt-2 text-xs text-slate-400">
                  Şirketiniz hakkında detaylı bilgi girin
                </p>
              </div>
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

      {/* Confirm Dialog */}
      {confirmDialog && (
        <ConfirmDialog
          isOpen={true}
          title={confirmDialog.title}
          message={confirmDialog.message}
          confirmText="Sil"
          confirmColor="red"
          onConfirm={confirmDialog.onConfirm}
          onCancel={confirmDialog.onCancel}
        />
      )}
    </div>
  );
}


