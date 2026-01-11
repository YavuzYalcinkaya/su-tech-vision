import Link from "next/link";
import HeroSlider from "./components/HeroSlider";

export default function Home() {
  return (
    <>
      {/* Hero Slider */}
      <HeroSlider />

      {/* Services Preview */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Hizmetlerimiz</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
              Neler <span className="gradient-text">Sunuyoruz?</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Dijital dünyada başarıya ulaşmanız için ihtiyacınız olan tüm hizmetleri sunuyoruz.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🌐",
                title: "Web Geliştirme",
                description: "Modern ve responsive web siteleri ile dijital varlığınızı güçlendirin.",
              },
              {
                icon: "📱",
                title: "Mobil Uygulama",
                description: "iOS ve Android platformları için native ve cross-platform uygulamalar.",
              },
              {
                icon: "🎨",
                title: "UI/UX Tasarım",
                description: "Kullanıcı deneyimini ön planda tutan modern arayüz tasarımları.",
              },
              {
                icon: "☁️",
                title: "Bulut Çözümleri",
                description: "Ölçeklenebilir ve güvenli bulut altyapı hizmetleri.",
              },
              {
                icon: "🔒",
                title: "Siber Güvenlik",
                description: "İşletmenizi dijital tehditlere karşı koruyun.",
              },
              {
                icon: "📊",
                title: "Veri Analitiği",
                description: "Verilerinizi anlamlı içgörülere dönüştürün.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-8 card-hover group"
              >
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/hizmetlerimiz" className="btn-secondary inline-block">
              Tüm Hizmetleri Görüntüle →
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Neden Biz?</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
                Farkımızı <span className="gradient-text">Keşfedin</span>
              </h2>
              <p className="text-slate-400 mb-8">
                Yılların getirdiği tecrübe ve sürekli yenilenme anlayışımızla müşterilerimize en iyi hizmeti sunmak için çalışıyoruz.
              </p>

              <div className="space-y-6">
                {[
                  { title: "Uzman Ekip", desc: "Alanında uzman mühendis ve tasarımcılardan oluşan ekibimiz" },
                  { title: "Modern Teknolojiler", desc: "En güncel teknolojileri kullanarak projeler geliştiriyoruz" },
                  { title: "Müşteri Odaklı", desc: "İhtiyaçlarınızı anlıyor, size özel çözümler üretiyoruz" },
                  { title: "7/24 Destek", desc: "Her zaman yanınızdayız, sorularınızı hızla yanıtlıyoruz" },
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
                    { number: "150+", label: "Başarılı Proje" },
                    { number: "50+", label: "Aktif Müşteri" },
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

      {/* CTA Section */}
      <section className="section-padding">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-12 lg:p-16 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"></div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Projenizi Hayata Geçirmeye <span className="gradient-text">Hazır mısınız?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              Dijital dönüşüm yolculuğunuzda yanınızda olmak için sabırsızlanıyoruz. Hemen bizimle iletişime geçin.
            </p>
            <Link href="/iletisim" className="btn-primary inline-block">
              Ücretsiz Danışmanlık Alın
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
