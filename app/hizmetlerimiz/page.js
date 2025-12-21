import Link from "next/link";

const services = [
  {
    icon: "🌐",
    title: "Web Geliştirme",
    description: "Modern, hızlı ve SEO uyumlu web siteleri geliştiriyoruz. React, Next.js, Vue.js gibi güncel teknolojilerle projelerinizi hayata geçiriyoruz.",
    features: ["Responsive Tasarım", "SEO Optimizasyonu", "Hızlı Yükleme", "CMS Entegrasyonu"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    icon: "📱",
    title: "Mobil Uygulama",
    description: "iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz. React Native ve Flutter ile hızlı çözümler sunuyoruz.",
    features: ["iOS & Android", "Cross-Platform", "Push Bildirimler", "Offline Mod"],
    color: "from-blue-400 to-purple-500",
  },
  {
    icon: "🎨",
    title: "UI/UX Tasarım",
    description: "Kullanıcı deneyimini ön planda tutan, estetik ve fonksiyonel arayüz tasarımları oluşturuyoruz.",
    features: ["Kullanıcı Araştırması", "Wireframe & Prototip", "Görsel Tasarım", "Usability Testing"],
    color: "from-purple-400 to-pink-500",
  },
  {
    icon: "☁️",
    title: "Bulut Çözümleri",
    description: "AWS, Google Cloud ve Azure altyapılarında ölçeklenebilir ve güvenli bulut çözümleri sunuyoruz.",
    features: ["Bulut Migrasyon", "DevOps & CI/CD", "Konteynerizasyon", "Sunucu Yönetimi"],
    color: "from-pink-400 to-red-500",
  },
  {
    icon: "🔒",
    title: "Siber Güvenlik",
    description: "İşletmenizi siber tehditlere karşı koruyoruz. Penetrasyon testleri ve güvenlik denetimleri yapıyoruz.",
    features: ["Güvenlik Denetimi", "Penetrasyon Testi", "Firewall Kurulumu", "Eğitim & Farkındalık"],
    color: "from-red-400 to-orange-500",
  },
  {
    icon: "📊",
    title: "Veri Analitiği",
    description: "Verilerinizi anlamlı içgörülere dönüştürüyoruz. İş zekası ve raporlama çözümleri sunuyoruz.",
    features: ["Veri Görselleştirme", "Dashboard & Raporlama", "Tahminsel Analitik", "Big Data"],
    color: "from-orange-400 to-yellow-500",
  },
  {
    icon: "🤖",
    title: "Yapay Zeka & ML",
    description: "Makine öğrenimi ve yapay zeka çözümleriyle iş süreçlerinizi otomatikleştiriyoruz.",
    features: ["Chatbot Geliştirme", "Görüntü İşleme", "Doğal Dil İşleme", "Öngörücü Modeller"],
    color: "from-yellow-400 to-green-500",
  },
  {
    icon: "🛒",
    title: "E-Ticaret Çözümleri",
    description: "Online satış platformları kuruyoruz. Ödeme entegrasyonları ve stok yönetimi dahil.",
    features: ["Mağaza Kurulumu", "Ödeme Entegrasyonu", "Stok Yönetimi", "Pazaryeri Entegrasyonu"],
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
              Hizmetlerimiz
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ne <span className="gradient-text">Yapıyoruz?</span>
            </h1>
            <p className="text-xl text-slate-400">
              Dijital dönüşüm yolculuğunuzda ihtiyacınız olan tüm teknoloji hizmetlerini tek çatı altında sunuyoruz.
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
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Süreç</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Nasıl <span className="gradient-text">Çalışıyoruz?</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Projelerinizi başarıyla tamamlamak için izlediğimiz adımlar
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Analiz", desc: "İhtiyaçlarınızı dinliyor, hedeflerinizi anlıyoruz" },
              { step: "02", title: "Planlama", desc: "Detaylı proje planı ve zaman çizelgesi oluşturuyoruz" },
              { step: "03", title: "Geliştirme", desc: "Agile metodoloji ile projenizi geliştiriyoruz" },
              { step: "04", title: "Teslimat", desc: "Test edip, eğitim vererek projeyi teslim ediyoruz" },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="glass rounded-2xl p-8 text-center card-hover">
                  <div className="text-6xl font-black gradient-text opacity-20 absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold gradient-text">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
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

      {/* Technologies */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Teknolojiler</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Kullandığımız <span className="gradient-text">Teknolojiler</span>
            </h2>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-4">
            {[
              "React", "Next.js", "Vue.js", "Angular",
              "Node.js", "Python", "Java", "Go",
              "PostgreSQL", "MongoDB", "Redis", "AWS",
              "Docker", "Kubernetes", "GraphQL", "TypeScript",
            ].map((tech, index) => (
              <div key={index} className="glass rounded-xl p-4 text-center card-hover">
                <span className="text-slate-300 text-sm font-medium">{tech}</span>
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
              Projeniz İçin <span className="gradient-text">Teklif Alın</span>
            </h2>
            <p className="text-slate-400 mb-8">
              Hizmetlerimiz hakkında detaylı bilgi almak ve projeniz için ücretsiz teklif almak için bizimle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn-primary inline-block">
              Ücretsiz Teklif Alın
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

