"use client";
import { useState, useEffect } from "react";
import aboutService from "../services/aboutService";

export default function Hakkimizda() {
  const [content, setContent] = useState({
    title: "Biz Kimiz?",
    description: "Teknoloji tutkumuz ve yenilikçi vizyonumuzla işletmelerin dijital dönüşümüne öncülük ediyoruz."
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await aboutService.getAboutContent();
      if (data && (data.title || data.description)) {
        setContent({
          title: data.title || "Biz Kimiz?",
          description: data.description || "Teknoloji tutkumuz ve yenilikçi vizyonumuzla işletmelerin dijital dönüşümüne öncülük ediyoruz."
        });
      }
    } catch (error) {
      console.error('Error loading about content:', error);
      // Use default content if error occurs
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6">
              Hakkımızda
            </span>
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              </div>
            ) : (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  {content.title.includes("Kimiz") ? (
                    <>
                      Biz <span className="gradient-text">Kimiz?</span>
                    </>
                  ) : (
                    <span className="gradient-text">{content.title}</span>
                  )}
                </h1>
                <p className="text-xl text-slate-400">
                  {content.description}
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Hikayemiz</span>
              <h2 className="text-4xl font-bold text-white mt-4 mb-6">
                2014&apos;ten <span className="gradient-text">Bugüne</span>
              </h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  SU Tech Vision, 2014 yılında teknolojiye olan tutkumuz ve yenilik arayışımızla kuruldu. 
                  Küçük bir ekiple başladığımız yolculuğumuz, bugün sektörün önde gelen teknoloji şirketlerinden 
                  biri olmamızla sonuçlandı.
                </p>
                <p>
                  Amacımız, işletmelerin dijital dünyada rekabet avantajı elde etmelerine yardımcı olmak ve 
                  teknolojiyi herkes için erişilebilir kılmaktır. Her projemizde kalite, güvenilirlik ve 
                  müşteri memnuniyetini ön planda tutuyoruz.
                </p>
                <p>
                  Bugün, 50&apos;den fazla aktif müşterimiz ve 150&apos;yi aşkın başarılı projemizle büyümeye 
                  ve sektöre değer katmaya devam ediyoruz.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative glass rounded-3xl p-8 space-y-8">
                {[
                  { year: "2014", event: "Şirketimizin kuruluşu" },
                  { year: "2016", event: "İlk büyük kurumsal projemiz" },
                  { year: "2018", event: "Ekibimizi 20 kişiye genişlettik" },
                  { year: "2020", event: "Uluslararası pazarlara açıldık" },
                  { year: "2023", event: "150+ proje başarıyla tamamlandı" },
                  { year: "2024", event: "Yapay zeka çözümlerine yatırım" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xl font-bold gradient-text">{item.year}</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-10 card-hover">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Misyonumuz</h3>
              <p className="text-slate-400 leading-relaxed">
                İşletmelere en yüksek kalitede teknoloji çözümleri sunarak dijital dönüşüm süreçlerinde 
                güvenilir bir partner olmak. Müşterilerimizin başarısını kendi başarımız olarak görüyor, 
                her projede değer yaratmayı hedefliyoruz.
              </p>
            </div>

            <div className="glass rounded-3xl p-10 card-hover">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Vizyonumuz</h3>
              <p className="text-slate-400 leading-relaxed">
                Teknoloji dünyasında küresel ölçekte tanınan, yenilikçi çözümleriyle fark yaratan ve 
                sektöre yön veren bir şirket olmak. Sürdürülebilir büyüme ve toplumsal değer yaratma 
                ilkesiyle geleceği şekillendirmeyi amaçlıyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Değerlerimiz</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Bizi <span className="gradient-text">Biz Yapan</span> Değerler
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "💡",
                title: "Yenilikçilik",
                description: "Sürekli öğreniyor, yeni teknolojileri takip ediyor ve uyguluyoruz.",
              },
              {
                icon: "🤝",
                title: "Güvenilirlik",
                description: "Söz verdiğimizi yapıyor, şeffaf ve dürüst iletişim kuruyoruz.",
              },
              {
                icon: "⭐",
                title: "Kalite",
                description: "Her projede mükemmeliyeti hedefliyor, detaylara önem veriyoruz.",
              },
              {
                icon: "👥",
                title: "Takım Ruhu",
                description: "Birlikte çalışıyor, birbirimizi destekliyor ve büyütüyoruz.",
              },
            ].map((value, index) => (
              <div key={index} className="glass rounded-2xl p-8 text-center card-hover">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-slate-400 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Ekibimiz</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Yetenekli <span className="gradient-text">Ekibimiz</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Alanında uzman, tutkulu ve yaratıcı profesyonellerden oluşan ekibimizle tanışın.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Ahmet Yılmaz", role: "CEO & Kurucu", color: "from-cyan-400 to-blue-500" },
              { name: "Elif Demir", role: "CTO", color: "from-blue-400 to-purple-500" },
              { name: "Can Kaya", role: "Proje Yöneticisi", color: "from-purple-400 to-pink-500" },
              { name: "Zeynep Arslan", role: "Baş Tasarımcı", color: "from-pink-400 to-red-500" },
            ].map((member, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center card-hover group">
                <div className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-3xl font-bold text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-slate-400 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

