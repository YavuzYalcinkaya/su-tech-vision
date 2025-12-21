const projects = [
  {
    title: "E-Ticaret Platformu",
    client: "ModaStore",
    category: "E-Ticaret",
    description: "Türkiye'nin önde gelen moda markalarından biri için geliştirdiğimiz kapsamlı e-ticaret platformu.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Finans Yönetim Sistemi",
    client: "BankTech",
    category: "Fintech",
    description: "Bankacılık sektörü için geliştirdiğimiz kurumsal finans yönetim ve raporlama sistemi.",
    tech: ["React", "Java", "Oracle", "Docker"],
    color: "from-blue-400 to-purple-500",
  },
  {
    title: "Sağlık Takip Uygulaması",
    client: "HealthPlus",
    category: "Sağlık",
    description: "Hastane ve kliniklerin hasta takibini kolaylaştıran mobil uygulama ve web paneli.",
    tech: ["React Native", "Node.js", "MongoDB", "Firebase"],
    color: "from-purple-400 to-pink-500",
  },
  {
    title: "Lojistik Yönetim Platformu",
    client: "CargoFlow",
    category: "Lojistik",
    description: "Kargo ve lojistik firmaları için entegre takip ve yönetim sistemi.",
    tech: ["Vue.js", "Python", "Redis", "Kubernetes"],
    color: "from-pink-400 to-red-500",
  },
  {
    title: "Eğitim Portalı",
    client: "EduLearn",
    category: "Eğitim",
    description: "Online eğitim platformu ve öğrenme yönetim sistemi (LMS) geliştirmesi.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "WebRTC"],
    color: "from-red-400 to-orange-500",
  },
  {
    title: "Akıllı Fabrika Sistemi",
    client: "IndustryPro",
    category: "Endüstri 4.0",
    description: "Üretim tesisleri için IoT tabanlı izleme ve otomasyon sistemi.",
    tech: ["React", "Python", "InfluxDB", "MQTT"],
    color: "from-orange-400 to-yellow-500",
  },
];

const testimonials = [
  {
    quote: "SU Tech Vision ile çalışmak harika bir deneyimdi. Profesyonel ekipleri ve zamanında teslimatları ile beklentilerimizin ötesinde bir proje teslim ettiler.",
    author: "Mehmet Yıldız",
    role: "CEO, ModaStore",
    color: "from-cyan-400 to-blue-500",
  },
  {
    quote: "Teknik uzmanlıkları ve müşteri odaklı yaklaşımları sayesinde projemiz çok başarılı oldu. Kesinlikle tavsiye ediyorum.",
    author: "Ayşe Kara",
    role: "CTO, BankTech",
    color: "from-blue-400 to-purple-500",
  },
  {
    quote: "Karmaşık sağlık sistemimizi başarıyla dijitalleştirdiler. Artık hastalarımıza çok daha iyi hizmet verebiliyoruz.",
    author: "Dr. Ali Demir",
    role: "Genel Müdür, HealthPlus",
    color: "from-purple-400 to-pink-500",
  },
];

const clients = [
  "ModaStore", "BankTech", "HealthPlus", "CargoFlow",
  "EduLearn", "IndustryPro", "TechStart", "DataCorp",
  "CloudNine", "SecureNet", "SmartCity", "GreenEnergy",
];

export default function Referanslar() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-medium mb-6">
              Referanslar
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Başarı <span className="gradient-text">Hikayelerimiz</span>
            </h1>
            <p className="text-xl text-slate-400">
              Farklı sektörlerde hayata geçirdiğimiz projeler ve birlikte çalıştığımız markalar
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { number: "150+", label: "Tamamlanan Proje" },
              { number: "50+", label: "Mutlu Müşteri" },
              { number: "12", label: "Farklı Sektör" },
              { number: "99%", label: "Memnuniyet Oranı" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">{stat.number}</div>
                <div className="text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Projeler</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Öne Çıkan <span className="gradient-text">Projelerimiz</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="glass rounded-3xl overflow-hidden card-hover group">
                <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                  <span className="text-6xl font-black text-white/20">{project.title.charAt(0)}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium">
                      {project.category}
                    </span>
                    <span className="text-slate-500 text-xs">• {project.client}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, idx) => (
                      <span key={idx} className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Yorumlar</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Müşterilerimiz <span className="gradient-text">Ne Diyor?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass rounded-3xl p-8 card-hover">
                <div className="text-4xl text-cyan-400 mb-4">"</div>
                <p className="text-slate-300 mb-6 italic">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold`}>
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{testimonial.author}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Müşteriler</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Birlikte Çalıştığımız <span className="gradient-text">Markalar</span>
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="glass rounded-xl p-6 flex items-center justify-center card-hover h-24">
                <span className="text-slate-400 font-semibold text-center">{client}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

