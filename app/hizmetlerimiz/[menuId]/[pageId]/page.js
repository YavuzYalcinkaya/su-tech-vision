"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import serviceMenuService from "../../../services/serviceMenuService";

export default function ServicePageDetail() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const result = await serviceMenuService.getServicePage(params.menuId, params.pageId);
        if (!result) {
          setError("Sayfa bulunamadı");
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.menuId && params.pageId) {
      fetchPage();
    }
  }, [params.menuId, params.pageId]);

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

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Sayfa Bulunamadı</h1>
          <p className="text-slate-400 mb-6">{error || "Bu sayfa mevcut değil veya kaldırılmış olabilir."}</p>
          <Link href="/hizmetlerimiz" className="btn-primary inline-block">
            Hizmetlere Dön
          </Link>
        </div>
      </div>
    );
  }

  const { menu, page } = data;

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
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
              <li>
                <Link href={`/hizmetlerimiz/${menu.id}`} className="text-slate-400 hover:text-cyan-400 transition-colors">
                  {menu.title}
                </Link>
              </li>
              <li className="text-slate-600">/</li>
              <li className="text-cyan-400">{page.title}</li>
            </ol>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              {menu.title}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {page.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl p-8 md:p-12">
            {/* Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              {page.content ? (
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                  {page.content}
                </div>
              ) : (
                <p className="text-slate-400 text-center py-8">
                  Bu sayfa için henüz içerik eklenmemiş.
                </p>
              )}
            </div>

            {/* Images */}
            {page.images && page.images.length > 0 && (
              <div className="mt-12">
                <h3 className="text-xl font-bold text-white mb-6">Görseller</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {page.images.map((image, index) => (
                    <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-slate-800">
                      <img
                        src={image.url || image}
                        alt={`${page.title} - Görsel ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-center">
            <Link
              href={`/hizmetlerimiz/${menu.id}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass text-slate-300 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>{menu.title} Hizmetlerine Dön</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Bu Hizmetle <span className="gradient-text">İlgileniyor musunuz?</span>
            </h2>
            <p className="text-slate-400 mb-8">
              {page.title} hizmetimiz hakkında detaylı bilgi almak ve teklif almak için bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="btn-primary inline-block">
                İletişime Geçin
              </Link>
              <Link href="/hizmetlerimiz" className="btn-secondary inline-block">
                Tüm Hizmetleri Gör
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

