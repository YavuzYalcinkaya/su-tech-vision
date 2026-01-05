"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import serviceMenuService from "../../services/serviceMenuService";

export default function ServiceMenuPage() {
  const params = useParams();
  const [menu, setMenu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const data = await serviceMenuService.getServiceMenuById(params.menuId);
        if (!data) {
          setError("Hizmet bulunamadı");
        } else {
          setMenu(data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.menuId) {
      fetchMenu();
    }
  }, [params.menuId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error || !menu) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Hizmet Bulunamadı</h1>
          <p className="text-slate-400 mb-6">{error || "Bu hizmet mevcut değil veya kaldırılmış olabilir."}</p>
          <Link href="/hizmetlerimiz" className="btn-primary inline-block">
            Hizmetlere Dön
          </Link>
        </div>
      </div>
    );
  }

  const activePages = menu.pages?.filter(page => page.active) || [];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm">
              <li>
                <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Anasayfa
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li>
                <Link href="/hizmetlerimiz" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-cyan-400">{menu.title}</li>
            </ol>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              Hizmetlerimiz
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {menu.title}
            </h1>
            {menu.description && (
              <p className="text-xl text-slate-400">
                {menu.description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Service Pages Grid */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activePages.length > 0 ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Alt <span className="gradient-text">Hizmetler</span>
                </h2>
                <p className="text-slate-400">
                  {menu.title} kapsamında sunduğumuz hizmetler
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activePages.map((page, index) => (
                  <Link
                    key={page.id}
                    href={`/hizmetlerimiz/${menu.id}/${page.id}`}
                    className="glass rounded-2xl p-6 card-hover group block"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-white font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                          {page.title}
                        </h3>
                        {page.content && (
                          <p className="text-slate-400 text-sm line-clamp-3">
                            {page.content.length > 150 
                              ? page.content.substring(0, 150) + '...' 
                              : page.content
                            }
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-cyan-400 text-sm font-medium">
                      <span>Detayları Görüntüle</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
                <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Henüz İçerik Yok</h3>
              <p className="text-slate-400">Bu hizmet için henüz alt sayfa eklenmemiş.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Bu Hizmet Hakkında <span className="gradient-text">Bilgi Alın</span>
            </h2>
            <p className="text-slate-400 mb-8">
              {menu.title} hizmetimiz hakkında detaylı bilgi almak için bizimle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn-primary inline-block">
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

