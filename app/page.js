import Link from "next/link";
import HeroSlider from "./components/HeroSlider";

// Ana sayfa SEO metadata
export const metadata = {
  title: "Güvenlik Kamerası ve IP Kamera Sistemleri | SU Tech Vision",
  description: "Türkiye'nin lider güvenlik kamerası firması. Profesyonel IP kamera sistemleri, CCTV kurulumu, NVR/DVR kayıt cihazları, 7/24 izleme ve teknik destek. Ücretsiz keşif için hemen arayın!",
  keywords: "güvenlik kamerası, IP kamera, CCTV, güvenlik sistemleri, kamera kurulumu, NVR, DVR, ev güvenlik kamerası, işyeri güvenlik kamerası, mobil izleme",
  alternates: {
    canonical: "https://sutechvision.com",
  },
};

export default function Home() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Preview - SEO Optimized */}
      <section className="section-padding bg-slate-900/50" id="hizmetler">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Güvenlik Kamera Sistemleri</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
              Profesyonel <span className="gradient-text">Güvenlik Çözümleri</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              IP kamera sistemleri, CCTV kurulumu ve 7/24 izleme hizmetleri ile evinizi ve işyerinizi güvende tutun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "📹",
                title: "IP Kamera Sistemleri",
                description: "Yüksek çözünürlüklü IP kameralar ile kristal netliğinde görüntü. 4K ve 8MP seçenekleri.",
              },
              {
                icon: "🎥",
                title: "CCTV Kamera Kurulumu",
                description: "Profesyonel CCTV kamera kurulumu. Dome, bullet ve PTZ kamera çeşitleri.",
              },
              {
                icon: "💾",
                title: "NVR / DVR Kayıt Cihazları",
                description: "Güvenilir video kayıt sistemleri. 30 güne kadar kayıt depolama kapasitesi.",
              },
              {
                icon: "📱",
                title: "Mobil İzleme Sistemi",
                description: "Akıllı telefonunuzdan 7/24 canlı izleme ve anlık bildirimler alın.",
              },
              {
                icon: "🌙",
                title: "Gece Görüşlü Kameralar",
                description: "IR LED teknolojisi ile karanlıkta 50 metreye kadar net görüntü.",
              },
              {
                icon: "🤖",
                title: "Yapay Zeka Kamera Sistemleri",
                description: "Hareket algılama, yüz tanıma ve akıllı analiz özellikleri.",
              },
            ].map((service, index) => (
              <article
                key={index}
                className="glass rounded-2xl p-8 card-hover group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/hizmetlerimiz" className="btn-secondary inline-block">
              Tüm Güvenlik Çözümlerini Görüntüle →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section - SEO Optimized */}
      <section className="section-padding relative overflow-hidden" id="neden-biz">
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Neden SU Tech Vision?</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
                Türkiye&apos;nin Güvenilir <span className="gradient-text">Güvenlik Kamerası</span> Firması
              </h2>
              <p className="text-slate-400 mb-8">
                10 yılı aşkın tecrübemizle ev ve işyeri güvenlik kamerası kurulumunda Türkiye&apos;nin lider firmalarından biriyiz. 
                Profesyonel IP kamera sistemleri ve CCTV çözümleri sunuyoruz.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Profesyonel Kurulum Ekibi", desc: "Sertifikalı güvenlik kamerası kurulum uzmanlarından oluşan ekibimiz" },
                  { title: "En Son Teknoloji Kameralar", desc: "4K, gece görüşlü, yapay zeka destekli IP kamera sistemleri" },
                  { title: "Ücretsiz Keşif Hizmeti", desc: "Mekanınıza özel güvenlik kamerası planlaması ve fiyat teklifi" },
                  { title: "7/24 Teknik Destek", desc: "Acil durumlarda anında müdahale ve uzaktan destek hizmeti" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative glass rounded-3xl p-8 lg:p-12">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { number: "99%", label: "Müşteri Memnuniyeti" },
                    { number: "500+", label: "Kamera Kurulumu" },
                    { number: "200+", label: "Aktif Müşteri" },
                    { number: "10+", label: "Yıl Tecrübe" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-6 rounded-2xl bg-slate-800/50">
                      <div className="text-3xl font-bold gradient-text mb-2">{stat.number}</div>
                      <div className="text-slate-400 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - SEO Optimized */}
      <section className="section-padding" id="iletisim-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Güvenlik Kamerası Kurulumu İçin <span className="gradient-text">Ücretsiz Keşif</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              IP kamera sistemleri ve CCTV kurulumu için ücretsiz keşif hizmeti alın. 
              Uzman ekibimiz size en uygun güvenlik kamerası çözümünü sunacak.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="btn-primary inline-block">
                Ücretsiz Keşif İsteyin
              </Link>
              <a href="tel:+90XXXXXXXXXX" className="btn-secondary inline-flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Hemen Arayın
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
