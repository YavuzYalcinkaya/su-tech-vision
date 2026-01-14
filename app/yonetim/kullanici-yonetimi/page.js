"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import userService from "../../services/userService";
import Toast from "../../components/Toast";
import ConfirmDialog from "../../components/ConfirmDialog";

export default function KullaniciYonetimiPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Toast state
  const [toast, setToast] = useState(null);
  
  // Confirm dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const showConfirm = (title, message, onConfirm) => {
    setConfirmDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
    });
  };

  const fetchUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      const userData = await userService.getAllUsers();
      setUsers(userData);
      setError("");
    } catch (err) {
      setError(err.message || 'Kullanıcılar yüklenirken bir hata oluştu');
      console.error('Fetch users error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check if user is admin
    const checkAdminAndFetchUsers = async () => {
      if (typeof window !== 'undefined') {
        const role = localStorage.getItem('userRole');
        console.log(role);
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          router.push('/giris');
          return;
        }
        
        if (role !== 'ADMIN') {
          router.push('/');
          return;
        }

        // Fetch users
        await fetchUsers();
      }
    };

    checkAdminAndFetchUsers();
  }, [router, fetchUsers]);

  const handleEditClick = (user) => {
    setEditingUser({
      username: user.username,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phone: user.phone,
      isActive: user.isActive,
      role: user.role
    });
    setIsEditModalOpen(true);
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;

    try {
      setIsSaving(true);
      await userService.updateUser(editingUser.username, {
        name: editingUser.name,
        surname: editingUser.surname,
        email: editingUser.email,
        phone: editingUser.phone,
        isActive: editingUser.isActive,
      });
      
      // Refresh users list
      await fetchUsers();
      setIsEditModalOpen(false);
      setEditingUser(null);
      showToast('Kullanıcı başarıyla güncellendi', 'success');
    } catch (err) {
      showToast(err.message || 'Kullanıcı güncellenirken bir hata oluştu', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleRole = (user) => {
    const newRole = user.role === 'ADMIN' ? 'USER' : 'ADMIN';
    const actionText = newRole === 'ADMIN' ? 'admin' : 'kullanıcı';
    
    showConfirm(
      'Rol Değiştir',
      `${user.username} kullanıcısını ${actionText} yapmak istediğinize emin misiniz?`,
      async () => {
        try {
          await userService.updateUserRole(user.username, newRole);
          await fetchUsers();
          showToast(
            `Kullanıcı ${newRole === 'ADMIN' ? 'admin' : 'kullanıcı'} yapıldı`,
            'success'
          );
        } catch (err) {
          showToast(err.message || 'Rol güncellenirken bir hata oluştu', 'error');
        } finally {
          setConfirmDialog({ isOpen: false, title: "", message: "", onConfirm: null });
        }
      }
    );
  };

  // Calculate stats
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.isActive).length;
  const inactiveUsers = users.filter(u => !u.isActive).length;
  const adminUsers = users.filter(u => u.role === 'ADMIN').length;

  return (
    <div className="min-h-screen pt-24 pb-12 bg-grid">
      <div className="absolute inset-0 bg-radial"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Kullanıcı Yönetimi</h1>
              <p className="text-slate-400 mt-1">Sistemdeki kullanıcıları yönetin</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6 border border-cyan-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Toplam Kullanıcı</p>
                <p className="text-3xl font-bold text-white mt-2">{totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-green-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Aktif Kullanıcı</p>
                <p className="text-3xl font-bold text-white mt-2">{activeUsers}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-yellow-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pasif Kullanıcı</p>
                <p className="text-3xl font-bold text-white mt-2">{inactiveUsers}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 border border-purple-500/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Yöneticiler</p>
                <p className="text-3xl font-bold text-white mt-2">{adminUsers}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="glass rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Kullanıcı Listesi</h2>
            <button className="btn-primary px-4 py-2 text-sm flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Yeni Kullanıcı
            </button>
          </div>

          {isLoading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              <p className="text-slate-400 mt-4">Yükleniyor...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Kullanıcı
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      E-posta
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Telefon
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center text-slate-400">
                        Henüz kullanıcı bulunmamaktadır.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {user.name?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">{user.name} {user.surname}</p>
                              <p className="text-xs text-slate-400">{user.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                            user.role === 'ADMIN'
                              ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                              : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full border ${
                            user.isActive
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {user.isActive ? 'Aktif' : 'Pasif'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                          <button 
                            onClick={() => handleEditClick(user)}
                            className="text-cyan-400 hover:text-cyan-300 mr-3 transition-colors"
                          >
                            Düzenle
                          </button>
                          <button 
                            onClick={() => handleToggleRole(user)}
                            className={`mr-3 transition-colors ${
                              user.role === 'ADMIN' 
                                ? 'text-yellow-400 hover:text-yellow-300' 
                                : 'text-purple-400 hover:text-purple-300'
                            }`}
                          >
                            {user.role === 'ADMIN' ? 'User Yap' : 'Admin Yap'}
                          </button>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            Sil
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {isEditModalOpen && editingUser && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700">
              <div className="p-6 border-b border-slate-700 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Kullanıcı Düzenle</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Username (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    value={editingUser.username}
                    disabled
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-500 mt-1">Kullanıcı adı değiştirilemez</p>
                </div>

                {/* Name & Surname */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Ad
                    </label>
                    <input
                      type="text"
                      value={editingUser.name}
                      onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Soyad
                    </label>
                    <input
                      type="text"
                      value={editingUser.surname}
                      onChange={(e) => setEditingUser({ ...editingUser, surname: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingUser.isActive}
                    onChange={(e) => setEditingUser({ ...editingUser, isActive: e.target.checked })}
                    className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-slate-300">
                    Aktif Kullanıcı
                  </label>
                </div>

                {/* Role Info (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Rol
                  </label>
                  <div className={`inline-flex px-4 py-2 rounded-lg ${
                    editingUser.role === 'ADMIN' 
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {editingUser.role}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Rolü değiştirmek için tablodaki &quot;Admin Yap&quot; / &quot;User Yap&quot; butonunu kullanın
                  </p>
                </div>
              </div>

              <div className="p-6 border-t border-slate-700 flex gap-3 justify-end">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  disabled={isSaving}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveUser}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText="Onayla"
        cancelText="İptal"
        confirmColor="purple"
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog({ isOpen: false, title: "", message: "", onConfirm: null })}
      />
    </div>
  );
}

