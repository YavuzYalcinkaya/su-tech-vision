export default function Kurumsal() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6">
              Kurumsal
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Kurumsal <span className="gradient-text">Yapımız</span>
            </h1>
            <p className="text-xl text-slate-400">
              Profesyonel yönetim anlayışımız ve kurumsal değerlerimizle sektörde güvenilir bir marka olarak konumlanıyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Şirket Profili</span>
              <h2 className="text-4xl font-bold text-white mt-4 mb-6">
                SU Tech Vision <span className="gradient-text">Hakkında</span>
              </h2>
              <div className="space-y-4 text-slate-400">
                <p>
                  SU Tech Vision, 2014 yılında İstanbul&apos;da kurulmuş olup, yazılım geliştirme, web tasarım, 
                  mobil uygulama geliştirme ve dijital pazarlama alanlarında hizmet vermektedir.
                </p>
                <p>
                  Şirketimiz, teknoloji sektöründe edindiği 10 yılı aşkın tecrübesiyle ulusal ve uluslararası 
                  pazarlarda faaliyet göstermekte olup, kalite standartlarına uygun hizmet anlayışıyla 
                  müşteri memnuniyetini ön planda tutmaktadır.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold gradient-text">2014</div>
                  <div className="text-slate-400 text-sm">Kuruluş Yılı</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold gradient-text">İstanbul</div>
                  <div className="text-slate-400 text-sm">Merkez</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold gradient-text">35+</div>
                  <div className="text-slate-400 text-sm">Çalışan</div>
                </div>
                <div className="glass rounded-xl p-4">
                  <div className="text-2xl font-bold gradient-text">5</div>
                  <div className="text-slate-400 text-sm">Departman</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <h3 className="text-xl font-bold text-white mb-6">Faaliyet Alanlarımız</h3>
              <div className="space-y-4">
                {[
                  "Yazılım Geliştirme & Danışmanlık",
                  "Web Tasarım & Geliştirme",
                  "Mobil Uygulama Geliştirme",
                  "Bulut Bilişim Çözümleri",
                  "Siber Güvenlik Hizmetleri",
                  "Veri Analitiği & İş Zekası",
                  "Dijital Pazarlama & SEO",
                  "Kurumsal Eğitim Hizmetleri",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-slate-300">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Chart */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Organizasyon</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Yönetim <span className="gradient-text">Kadromuz</span>
            </h2>
          </div>

          {/* CEO */}
          <div className="flex justify-center mb-8">
            <div className="glass rounded-2xl p-6 text-center card-hover w-72">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-2xl font-bold text-white mb-4">
                AY
              </div>
              <h3 className="text-lg font-semibold text-white">Ahmet Yılmaz</h3>
              <p className="text-cyan-400 text-sm">CEO & Kurucu</p>
            </div>
          </div>

          {/* C-Level */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { initials: "ED", name: "Elif Demir", role: "CTO", color: "from-blue-400 to-purple-500" },
              { initials: "MK", name: "Mehmet Kara", role: "CFO", color: "from-purple-400 to-pink-500" },
              { initials: "SÇ", name: "Selin Çelik", role: "COO", color: "from-pink-400 to-red-500" },
              { initials: "BÖ", name: "Burak Özkan", role: "CMO", color: "from-orange-400 to-yellow-500" },
            ].map((exec, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center card-hover">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${exec.color} flex items-center justify-center text-xl font-bold text-white mb-3`}>
                  {exec.initials}
                </div>
                <h3 className="text-md font-semibold text-white">{exec.name}</h3>
                <p className="text-slate-400 text-sm">{exec.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Partners */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Certificates */}
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Sertifikalar</span>
              <h2 className="text-3xl font-bold text-white mt-4 mb-8">
                Kalite <span className="gradient-text">Belgelerimiz</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "ISO 9001:2015", desc: "Kalite Yönetim Sistemi" },
                  { name: "ISO 27001", desc: "Bilgi Güvenliği" },
                  { name: "KVKK", desc: "Kişisel Verilerin Korunması" },
                  { name: "AWS Partner", desc: "Amazon Web Services" },
                ].map((cert, index) => (
                  <div key={index} className="glass rounded-xl p-4 card-hover">
                    <div className="text-lg font-bold text-white mb-1">{cert.name}</div>
                    <div className="text-slate-400 text-sm">{cert.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">İş Ortaklıkları</span>
              <h2 className="text-3xl font-bold text-white mt-4 mb-8">
                Çözüm <span className="gradient-text">Ortaklarımız</span>
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {["Microsoft", "Google", "Amazon", "Oracle", "SAP", "Salesforce"].map((partner, index) => (
                  <div key={index} className="glass rounded-xl p-6 flex items-center justify-center card-hover">
                    <span className="text-slate-300 font-semibold">{partner}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Documents */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Belgeler</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Kurumsal <span className="gradient-text">Dokümanlar</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📄", title: "Şirket Profili", type: "PDF" },
              { icon: "📊", title: "Faaliyet Raporu", type: "PDF" },
              { icon: "🔒", title: "Gizlilik Politikası", type: "PDF" },
              { icon: "📋", title: "Hizmet Şartları", type: "PDF" },
            ].map((doc, index) => (
              <div key={index} className="glass rounded-2xl p-6 card-hover cursor-pointer group">
                <div className="text-4xl mb-4">{doc.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {doc.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span className="text-cyan-400">İndir</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

