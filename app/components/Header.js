"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import authService from "../services/authService";

const navItems = [
  { name: "Anasayfa", path: "/" },
  { 
    name: "Hakkımızda", 
    path: "/hakkimizda",
    hasDropdown: true,
    subItems: [
      { name: "Hakkımızda", path: "/hakkimizda" },
      { name: "Kurumsal", path: "/kurumsal" },
    ]
  },
  { name: "Hizmetlerimiz", path: "/hizmetlerimiz" },
  { name: "Referanslar", path: "/referanslar" },
  { name: "İlanlar", path: "/ilanlar" },
  { name: "İletişim", path: "/iletisim" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isMenuManagementOpen, setIsMenuManagementOpen] = useState(false);
  const [isHakkimizdaOpen, setIsHakkimizdaOpen] = useState(false);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();
  
  // Timeout refs for hover delays
  const adminMenuTimeout = useRef(null);
  const menuManagementTimeout = useRef(null);
  const hakkimizdaTimeout = useRef(null);

  useEffect(() => {
    // Check if user is logged in
    const checkUser = () => {
      if (typeof window !== 'undefined') {
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('authToken');
        const role = localStorage.getItem('userRole');
        if (username && token) {
          setUser({ username, role });
        } else {
          setUser(null);
        }
      }
    };

    checkUser();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkUser);
    
    // Custom event for same-tab login
    window.addEventListener('userLogin', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userLogin', checkUser);
    };
  }, []);

  const handleSignOut = () => {
    authService.signOut();
    localStorage.removeItem('username');
    setUser(null);
    setIsMenuOpen(false);
    router.push('/');
  };

  // Improved hover handlers with delays
  const handleAdminMenuEnter = () => {
    if (adminMenuTimeout.current) {
      clearTimeout(adminMenuTimeout.current);
    }
    setIsAdminMenuOpen(true);
  };

  const handleAdminMenuLeave = () => {
    adminMenuTimeout.current = setTimeout(() => {
      setIsAdminMenuOpen(false);
      setIsMenuManagementOpen(false);
    }, 500); // 300ms delay before closing
  };

  const handleMenuManagementEnter = () => {
    if (menuManagementTimeout.current) {
      clearTimeout(menuManagementTimeout.current);
    }
    setIsMenuManagementOpen(true);
  };

  const handleMenuManagementLeave = () => {
    menuManagementTimeout.current = setTimeout(() => {
      setIsMenuManagementOpen(false);
    }, 300); // 200ms delay before closing submenu
  };

  const handleHakkimizdaEnter = () => {
    if (hakkimizdaTimeout.current) {
      clearTimeout(hakkimizdaTimeout.current);
    }
    setIsHakkimizdaOpen(true);
  };

  const handleHakkimizdaLeave = () => {
    hakkimizdaTimeout.current = setTimeout(() => {
      setIsHakkimizdaOpen(false);
    }, 300);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 shadow-lg shadow-cyan-500/25">
              <span className="text-white font-black text-xl">SU</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Tech Vision
              </span>
              <p className="text-xs text-slate-400 -mt-1">Geleceği Şekillendiriyoruz</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div
                  key={item.path}
                  className="relative group"
                  onMouseEnter={handleHakkimizdaEnter}
                  onMouseLeave={handleHakkimizdaLeave}
                >
                  <Link
                    href={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative flex items-center gap-1 ${
                      pathname === item.path || pathname === '/kurumsal'
                        ? "text-cyan-400"
                        : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isHakkimizdaOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    <span
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                        pathname === item.path || pathname === '/kurumsal' ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                  
                  {/* Dropdown */}
                  {isHakkimizdaOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 glass rounded-xl border border-slate-700 shadow-xl overflow-hidden z-50">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`block px-4 py-3 text-sm transition-all ${
                            pathname === subItem.path
                              ? "text-cyan-400 bg-cyan-500/10"
                              : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    pathname === item.path
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                      pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              )
            ))}
            
            {/* Admin Dropdown Menu */}
            {user && user.role === "ADMIN" && (
              <div 
                className="relative"
                onMouseEnter={handleAdminMenuEnter}
                onMouseLeave={handleAdminMenuLeave}
              >
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group flex items-center gap-2 ${
                    pathname.startsWith('/yonetim')
                      ? "text-cyan-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Yönetim Paneli
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isAdminMenuOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 ${
                      pathname.startsWith('/yonetim') ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
                
                {/* Dropdown */}
                <div
                  className={`absolute top-full mt-2 left-0 w-56 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl transition-all duration-200 ${
                    isAdminMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}
                  onMouseEnter={handleAdminMenuEnter}
                  onMouseLeave={handleAdminMenuLeave}
                >
                  <div className="py-2">
                    <Link
                      href="/yonetim/kullanici-yonetimi"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                    >
                      <svg
                        className="w-5 h-5 text-cyan-400"
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
                      Kullanıcı Yönetimi
                    </Link>
                    
                    {/* Menu Management with Submenu */}
                    <div 
                      className="relative"
                      onMouseEnter={handleMenuManagementEnter}
                      onMouseLeave={handleMenuManagementLeave}
                    >
                      <div className="flex items-center justify-between px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all cursor-pointer">
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-5 h-5 text-cyan-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                          Menü Yönetimi
                        </div>
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isMenuManagementOpen ? 'rotate-90' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                      
                      {/* Submenu */}
                      <div
                        className={`absolute left-full top-0 ml-1 w-52 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl transition-all duration-200 z-50 ${
                          isMenuManagementOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'
                        }`}
                        onMouseEnter={handleMenuManagementEnter}
                        onMouseLeave={handleMenuManagementLeave}
                      >
                        <div className="py-2">
                          <Link
                            href="/yonetim/menu-yonetimi/hizmetler"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                          >
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Hizmetler
                          </Link>
                          <Link
                            href="/yonetim/menu-yonetimi/hakkimizda"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                          >
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Hakkımızda
                          </Link>
                          <Link
                            href="/yonetim/menu-yonetimi/ilanlar"
                            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
                          >
                            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            İlanlar
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* User Section */}
            {user ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-700">
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/50 rounded-lg">
                  <svg
                    className="w-5 h-5 text-cyan-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">{user.username}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-all duration-300 border border-red-500/30 hover:border-red-500/50 whitespace-nowrap"
                >
                  Çıkış Yap
                </button>
              </div>
            ) : (
              <Link
                href="/giris"
                className="ml-4 pl-4 border-l border-slate-700 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-lg text-sm font-medium transition-all duration-300 shadow-lg shadow-cyan-500/25"
              >
                Giriş Yap
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[600px] pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-1 pt-2">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.path}>
                  <button
                    onClick={() => setIsHakkimizdaOpen(!isHakkimizdaOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                      pathname === item.path || pathname === '/kurumsal'
                        ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <span>{item.name}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isHakkimizdaOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isHakkimizdaOpen && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                            pathname === subItem.path
                              ? "bg-cyan-500/10 text-cyan-400"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    pathname === item.path
                      ? "bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}
            
            {/* Mobile Admin Menu */}
            {user && user.role === "ADMIN" && (
              <div className="border-t border-slate-700 mt-2 pt-2">
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Yönetim Paneli
                </div>
                <Link
                  href="/yonetim/kullanici-yonetimi"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
                >
                  <svg
                    className="w-5 h-5 text-cyan-400"
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
                  Kullanıcı Yönetimi
                </Link>
                
                <div className="px-4 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
                  Menü Yönetimi
                </div>
                <Link
                  href="/yonetim/menu-yonetimi/hizmetler"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Hizmetler
                </Link>
                <Link
                  href="/yonetim/menu-yonetimi/hakkimizda"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Hakkımızda
                </Link>
                <Link
                  href="/yonetim/menu-yonetimi/ilanlar"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  İlanlar
                </Link>
              </div>
            )}
            
            {/* Mobile User Section */}
            {user ? (
              <>
                <div className="px-4 py-3 mt-2 border-t border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-5 h-5 text-cyan-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-white">{user.username}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-all duration-300 border border-red-500/30 whitespace-nowrap"
                  >
                    Çıkış Yap
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/giris"
                onClick={() => setIsMenuOpen(false)}
                className="mx-4 mt-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg text-sm font-medium text-center transition-all duration-300"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
