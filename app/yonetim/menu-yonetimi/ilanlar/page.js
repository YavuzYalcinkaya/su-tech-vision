"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Toast from "../../../components/Toast";
import ConfirmDialog from "../../../components/ConfirmDialog";
import jobService from "../../../services/jobService";

export default function IlanlarYonetimiPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentJob, setCurrentJob] = useState({
    id: null,
    title: "",
    description: "",
    companyName: "",
    location: "",
    employmentType: "FULL_TIME",
    experienceLevel: "MID",
    minSalary: "",
    maxSalary: "",
    applicationDeadline: "",
  });

  const employmentTypes = [
    { value: "FULL_TIME", label: "Tam Zamanlı" },
    { value: "PART_TIME", label: "Yarı Zamanlı" },
    { value: "CONTRACT", label: "Sözleşmeli" },
    { value: "INTERNSHIP", label: "Stajyer" },
  ];

  const experienceLevels = [
    { value: "ENTRY", label: "Başlangıç" },
    { value: "MID", label: "Orta" },
    { value: "SENIOR", label: "Kıdemli" },
    { value: "LEAD", label: "Lider" },
  ];

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
    loadJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const loadJobs = async () => {
    try {
      const data = await jobService.getAllJobs();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading jobs:', error);
      showToast(error.message || "İlanlar yüklenirken hata oluştu", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setCurrentJob({
      id: null,
      title: "",
      description: "",
      companyName: "",
      location: "",
      employmentType: "FULL_TIME",
      experienceLevel: "MID",
      minSalary: "",
      maxSalary: "",
      applicationDeadline: "",
    });
    setIsEditMode(false);
  };

  const handleEdit = (job) => {
    // Format the date for input[type="date"] which expects YYYY-MM-DD
    const formatDate = (dateString) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      } catch {
        return dateString;
      }
    };

    setCurrentJob({
      id: job.id,
      title: job.title || "",
      description: job.description || "",
      companyName: job.companyName || "",
      location: job.location || "",
      employmentType: job.employmentType || "FULL_TIME",
      experienceLevel: job.experienceLevel || "MID",
      minSalary: job.minSalary || "",
      maxSalary: job.maxSalary || "",
      applicationDeadline: formatDate(job.applicationDeadline),
    });
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSave = async () => {
    // Validation
    if (!currentJob.title.trim()) {
      showToast("Lütfen ilan başlığı girin", "error");
      return;
    }
    if (!currentJob.description.trim()) {
      showToast("Lütfen ilan açıklaması girin", "error");
      return;
    }
    if (!currentJob.companyName.trim()) {
      showToast("Lütfen şirket adı girin", "error");
      return;
    }
    if (!currentJob.location.trim()) {
      showToast("Lütfen lokasyon girin", "error");
      return;
    }
    if (!currentJob.applicationDeadline) {
      showToast("Lütfen başvuru son tarihi girin", "error");
      return;
    }

    setIsSaving(true);
    try {
      const data = {
        title: currentJob.title,
        description: currentJob.description,
        companyName: currentJob.companyName,
        location: currentJob.location,
        employmentType: currentJob.employmentType,
        experienceLevel: currentJob.experienceLevel,
        minSalary: currentJob.minSalary ? parseInt(currentJob.minSalary) : null,
        maxSalary: currentJob.maxSalary ? parseInt(currentJob.maxSalary) : null,
        applicationDeadline: currentJob.applicationDeadline,
      };

      if (isEditMode && currentJob.id) {
        await jobService.updateJob(currentJob.id, data);
        showToast("İlan başarıyla güncellendi", "success");
      } else {
        await jobService.createJob(data);
        showToast("İlan başarıyla oluşturuldu", "success");
      }

      resetForm();
      await loadJobs();
    } catch (error) {
      console.error('Save error:', error);
      showToast(error.message || "Kaydetme sırasında bir hata oluştu", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (job) => {
    console.log('handleDelete called with job:', job); // Debug
    setConfirmDialog({
      title: "İlanı Sil",
      message: `"${job.title}" ilanını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      onConfirm: async () => {
        console.log('Delete confirmed for job ID:', job.id); // Debug
        setConfirmDialog(null);
        setIsSaving(true);
        try {
          console.log('Calling jobService.deleteJob with ID:', job.id); // Debug
          const result = await jobService.deleteJob(job.id);
          console.log('Delete result:', result); // Debug
          showToast("İlan başarıyla silindi", "success");
          await loadJobs();
          if (currentJob.id === job.id) {
            resetForm();
          }
        } catch (error) {
          console.error('Delete error:', error);
          showToast(error.message || "Silme sırasında bir hata oluştu", "error");
        } finally {
          setIsSaving(false);
        }
      },
      onCancel: () => {
        console.log('Delete cancelled'); // Debug
        setConfirmDialog(null);
      },
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
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">İlanlar Yönetimi</h1>
              <p className="text-slate-400 mt-1">İş ilanlarını oluşturun ve yönetin</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="glass rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  {isEditMode ? "İlan Düzenle" : "Yeni İlan Oluştur"}
                </h2>
                {isEditMode && (
                  <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/30">
                    Düzenleniyor
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    İlan Başlığı <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={currentJob.title}
                    onChange={(e) => setCurrentJob({ ...currentJob, title: e.target.value })}
                    placeholder="Örn: Frontend Developer"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Açıklama <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={currentJob.description}
                    onChange={(e) => setCurrentJob({ ...currentJob, description: e.target.value })}
                    rows={4}
                    placeholder="İlan açıklaması..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none transition-all"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Şirket Adı <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentJob.companyName}
                      onChange={(e) => setCurrentJob({ ...currentJob, companyName: e.target.value })}
                      placeholder="Örn: Tech Company"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Lokasyon <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={currentJob.location}
                      onChange={(e) => setCurrentJob({ ...currentJob, location: e.target.value })}
                      placeholder="Örn: İstanbul / Remote"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Çalışma Türü <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={currentJob.employmentType}
                      onChange={(e) => setCurrentJob({ ...currentJob, employmentType: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      {employmentTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Deneyim Seviyesi <span className="text-red-400">*</span>
                    </label>
                    <select
                      value={currentJob.experienceLevel}
                      onChange={(e) => setCurrentJob({ ...currentJob, experienceLevel: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Min. Maaş (₺)
                    </label>
                    <input
                      type="number"
                      value={currentJob.minSalary}
                      onChange={(e) => setCurrentJob({ ...currentJob, minSalary: e.target.value })}
                      placeholder="Örn: 45000"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Max. Maaş (₺)
                    </label>
                    <input
                      type="number"
                      value={currentJob.maxSalary}
                      onChange={(e) => setCurrentJob({ ...currentJob, maxSalary: e.target.value })}
                      placeholder="Örn: 55000"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Başvuru Son Tarihi <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={currentJob.applicationDeadline}
                    onChange={(e) => setCurrentJob({ ...currentJob, applicationDeadline: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex gap-3">
                  {isEditMode && (
                    <button
                      onClick={resetForm}
                      disabled={isSaving}
                      className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      İptal
                    </button>
                  )}
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className={`${isEditMode ? 'flex-1' : 'w-full'} btn-primary px-6 py-3 flex items-center justify-center gap-2`}
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {isEditMode ? "Güncelleniyor..." : "Kaydediliyor..."}
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isEditMode ? "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" : "M5 13l4 4L19 7"} />
                        </svg>
                        {isEditMode ? "Güncelle" : "Oluştur"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-1">
            <div className="glass rounded-xl p-6 border border-slate-700">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center justify-between">
                <span>Mevcut İlanlar</span>
                <span className="text-sm font-normal text-slate-400">({jobs.length})</span>
              </h2>

              {jobs.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <svg className="w-16 h-16 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>Henüz ilan eklenmemiş</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className={`p-4 rounded-xl border transition-all ${
                        currentJob.id === job.id
                          ? "bg-cyan-500/10 border-cyan-500/50"
                          : "bg-slate-800/50 border-slate-700 hover:border-slate-600"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleEdit(job)}>
                          <h3 className="font-semibold text-white truncate">{job.title}</h3>
                          <p className="text-sm text-slate-400 truncate">{job.companyName}</p>
                          <p className="text-xs text-slate-500 mt-1">{job.location}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEdit(job);
                            }}
                            className="p-2 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-all"
                            title="Düzenle"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(job);
                            }}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
                            title="Sil"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(100, 116, 139, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
    </div>
  );
}

