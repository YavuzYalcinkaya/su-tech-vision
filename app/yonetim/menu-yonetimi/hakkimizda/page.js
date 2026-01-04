"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";

export default function HakkimizdaYonetimiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [content, setContent] = useState({
    title: "Biz Kimiz?",
    subtitle: "Dijital Dünyanın Öncüleri",
    description: "SU Tech Vision olarak 2020 yılından beri dijital dönüşüm alanında faaliyet göstermekteyiz. Modern teknolojileri kullanarak işletmelerin dijital dünyada başarılı olmalarını sağlıyoruz.",
    mission: "Müşterilerimize en iyi teknolojiyi en uygun fiyata sunmak",
    vision: "Dijital dönüşümde Türkiye'nin lider şirketi olmak",
    values: [
      { id: 1, title: "İnovasyon", description: "Sürekli yenilik ve gelişim" },
      { id: 2, title: "Kalite", description: "Her projede en yüksek standartlar" },
      { id: 3, title: "Müşteri Odaklılık", description: "Müşteri memnuniyeti önceliğimiz" },
    ],
    stats: [
      { id: 1, number: "500+", label: "Tamamlanan Proje" },
      { id: 2, number: "300+", label: "Mutlu Müşteri" },
      { id: 3, number: "50+", label: "Uzman Ekip" },
      { id: 4, number: "10+", label: "Yıllık Tecrübe" },
    ],
  });

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

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      showToast("İçerik başarıyla kaydedildi", "success");
      setIsSaving(false);
    }, 500);
  };

  const handleAddValue = () => {
    setContent({
      ...content,
      values: [...content.values, { id: Date.now(), title: "", description: "" }]
    });
  };

  const handleUpdateValue = (id, field, value) => {
    setContent({
      ...content,
      values: content.values.map(v => v.id === id ? { ...v, [field]: value } : v)
    });
  };

  const handleDeleteValue = (id) => {
    setContent({
      ...content,
      values: content.values.filter(v => v.id !== id)
    });
  };

  const handleUpdateStat = (id, field, value) => {
    setContent({
      ...content,
      stats: content.stats.map(s => s.id === id ? { ...s, [field]: value } : s)
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
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary px-6 py-3 flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Kaydediliyor...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Kaydet
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          {/* Main Content */}
          <div className="glass rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">Ana İçerik</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Başlık</label>
                <input
                  type="text"
                  value={content.title}
                  onChange={(e) => setContent({ ...content, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Alt Başlık</label>
                <input
                  type="text"
                  value={content.subtitle}
                  onChange={(e) => setContent({ ...content, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Açıklama</label>
                <textarea
                  value={content.description}
                  onChange={(e) => setContent({ ...content, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Misyon</h2>
              <textarea
                value={content.mission}
                onChange={(e) => setContent({ ...content, mission: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>
            <div className="glass rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4">Vizyon</h2>
              <textarea
                value={content.vision}
                onChange={(e) => setContent({ ...content, vision: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>
          </div>

          {/* Values */}
          <div className="glass rounded-xl p-6 border border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Değerlerimiz</h2>
              <button
                onClick={handleAddValue}
                className="px-4 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Yeni Değer
              </button>
            </div>
            <div className="space-y-4">
              {content.values.map((value) => (
                <div key={value.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="flex gap-4">
                    <div className="flex-1 space-y-3">
                      <input
                        type="text"
                        value={value.title}
                        onChange={(e) => handleUpdateValue(value.id, 'title', e.target.value)}
                        placeholder="Başlık"
                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                      <input
                        type="text"
                        value={value.description}
                        onChange={(e) => handleUpdateValue(value.id, 'description', e.target.value)}
                        placeholder="Açıklama"
                        className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      />
                    </div>
                    <button
                      onClick={() => handleDeleteValue(value.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-all h-fit"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="glass rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4">İstatistikler</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {content.stats.map((stat) => (
                <div key={stat.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <input
                    type="text"
                    value={stat.number}
                    onChange={(e) => handleUpdateStat(stat.id, 'number', e.target.value)}
                    placeholder="Sayı (örn: 500+)"
                    className="w-full px-4 py-2 mb-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => handleUpdateStat(stat.id, 'label', e.target.value)}
                    placeholder="Etiket"
                    className="w-full px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              ))}
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

