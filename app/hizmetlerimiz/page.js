import Link from "next/link";

export const metadata = {
  title: "Güvenlik Kamera Sistemleri Hizmetleri | IP Kamera Kurulumu",
  description: "Profesyonel güvenlik kamerası kurulumu, IP kamera sistemleri, CCTV, NVR/DVR kayıt cihazları, mobil izleme ve 7/24 teknik destek hizmetleri. Ücretsiz keşif için arayın!",
  keywords: "güvenlik kamerası kurulumu, IP kamera sistemleri, CCTV kurulumu, NVR kurulumu, DVR kurulumu, mobil izleme, gece görüşlü kamera, dome kamera, bullet kamera, PTZ kamera",
  alternates: {
    canonical: "https://sutechvision.com/hizmetlerimiz",
  },
  openGraph: {
    title: "Güvenlik Kamera Sistemleri Hizmetleri | SU Tech Vision",
    description: "Profesyonel güvenlik kamerası kurulumu ve IP kamera sistemleri hizmetleri.",
    url: "https://sutechvision.com/hizmetlerimiz",
  },
};

const services = [
  {
    icon: "📹",
    title: "IP Kamera Sistemleri",
    description: "Yüksek çözünürlüklü IP kamera kurulumu. 2MP, 4MP, 4K ve 8MP seçenekleriyle kristal netliğinde görüntü kalitesi. PoE destekli kolay kurulum.",
    features: ["4K Ultra HD", "PoE Destekli", "H.265 Sıkıştırma", "Geniş Açı Lens"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: "🎥",
    title: "CCTV Kamera Kurulumu",
    description: "Profesyonel CCTV kamera sistemi kurulumu. Analog HD, TVI, AHD ve CVI formatlarında yüksek kaliteli görüntü kayıt çözümleri.",
    features: ["Dome Kamera", "Bullet Kamera", "PTZ Kamera", "Vandal-Proof"],
    color: "from-blue-400 to-purple-500",
  },
  {
    icon: "💾",
    title: "NVR / DVR Kayıt Cihazları",
    description: "Network Video Recorder (NVR) ve Digital Video Recorder (DVR) kurulumu. 30 güne kadar kesintisiz kayıt ve kolay erişim.",
    features: ["30 Gün Kayıt", "RAID Desteği", "Uzaktan Erişim", "Akıllı Arama"],
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: "📱",
    title: "Mobil İzleme Sistemi",
    description: "Akıllı telefonunuzdan 7/24 canlı izleme. iOS ve Android uyumlu uygulamalarla her yerden güvenlik kontrolü.",
    features: ["iOS & Android", "Canlı İzleme", "Anlık Bildirim", "Çoklu Kamera"],
    color: "from-pink-400 to-red-500",
  },
  {
    icon: "🌙",
    title: "Gece Görüşlü Kameralar",
    description: "IR LED teknolojisi ile karanlıkta 50 metreye kadar net görüntü. Starlight ve renkli gece görüşü seçenekleri.",
    features: ["50m IR Mesafe", "Starlight", "Renkli Gece Görüşü", "WDR Teknolojisi"],
    color: "from-red-400 to-orange-500",
  },
  {
    icon: "🤖",
    title: "Yapay Zeka Kamera Sistemleri",
    description: "Akıllı video analizi ile hareket algılama, yüz tanıma, plaka okuma ve nesne tespiti özellikleri.",
    features: ["Yüz Tanıma", "Plaka Okuma", "Hareket Algılama", "Nesne Takibi"],
    color: "from-orange-400 to-yellow-500",
  },
  {
    icon: "🏠",
    title: "Ev Güvenlik Sistemleri",
    description: "Evler için özel güvenlik kamerası paketleri. Kablosuz WiFi kameralar ve kolay kurulum seçenekleri.",
    features: ["WiFi Kamera", "Kablosuz Sistem", "Kolay Kurulum", "Bulut Kayıt"],
    color: "from-yellow-400 to-green-500",
  },
  {
    icon: "🏢",
    title: "İşyeri Güvenlik Çözümleri",
    description: "Mağaza, ofis, fabrika ve plaza için kapsamlı güvenlik sistemleri. Çoklu kamera yönetimi ve merkezi izleme.",
    features: ["Merkezi İzleme", "Çoklu Lokasyon", "Entegre Sistem", "Erişim Kontrolü"],
    color: "from-green-400 to-cyan-500",
  },
];

export default function Hizmetlerimiz() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
              Güvenlik Kamera Sistemleri Hizmetlerimiz
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Profesyonel <span className="gradient-text">Güvenlik Çözümleri</span>
            </h1>
            <p className="text-xl text-slate-400">
              IP kamera sistemleri, CCTV kurulumu, NVR/DVR kayıt cihazları ve 7/24 izleme hizmetleriyle güvenliğinizi sağlıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="glass rounded-3xl p-8 card-hover group">
                <div className="flex items-start gap-6">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400 mb-6">{service.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Kurulum Süreci</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Güvenlik Kamerası <span className="gradient-text">Kurulum Adımları</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Profesyonel güvenlik kamerası kurulumunda izlediğimiz adımlar
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Ücretsiz Keşif", desc: "Mekanınızı ziyaret ediyor, güvenlik ihtiyaçlarınızı belirliyoruz" },
              { step: "02", title: "Proje & Teklif", desc: "Size özel kamera yerleşim planı ve fiyat teklifi sunuyoruz" },
              { step: "03", title: "Kurulum", desc: "Uzman ekibimiz kamera ve kayıt sistemlerini kuruyor" },
              { step: "04", title: "Eğitim & Destek", desc: "Sistem kullanımını öğretiyor, 7/24 destek sağlıyoruz" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <article className="glass rounded-2xl p-8 text-center card-hover">
                  <div className="text-6xl font-black gradient-text opacity-20 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold gradient-text">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </article>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-cyan-500/30">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands & Technologies */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Markalar</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Çalıştığımız <span className="gradient-text">Güvenlik Kamerası Markaları</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Dünya genelinde güvenilir güvenlik kamerası ve IP kamera markalarının yetkili satıcısı ve kurulumcusuyuz.
            </p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              "Hikvision", "Dahua", "Uniview", "Hanwha",
              "Axis", "Bosch", "Panasonic", "Sony",
              "Vivotek", "Honeywell", "Pelco", "IDIS",
              "Milesight", "TVT", "Reolink", "Ezviz",
            ].map((brand, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center card-hover">
                <span className="text-slate-300 text-sm font-medium">{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Güvenlik Kamerası Kurulumu İçin <span className="gradient-text">Ücretsiz Keşif</span>
            </h2>
            <p className="text-slate-400 mb-8">
              IP kamera sistemleri ve CCTV kurulumu için ücretsiz keşif hizmeti alın. 
              Uzman ekibimiz mekanınıza en uygun güvenlik kamerası çözümünü belirleyecek.
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

