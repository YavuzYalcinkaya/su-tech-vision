"use client";
import { useState } from "react";
import Link from "next/link";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Yazılım Geliştirme",
    location: "İstanbul (Hibrit)",
    type: "Tam Zamanlı",
    experience: "5+ Yıl",
    description: "React ve Next.js konusunda deneyimli, modern web uygulamaları geliştirecek bir Frontend Developer arıyoruz.",
    requirements: [
      "React, Next.js ile 5+ yıl deneyim",
      "TypeScript bilgisi",
      "State management (Redux, Zustand)",
      "REST API ve GraphQL deneyimi",
      "Git ve CI/CD süreçlerine hakimiyet",
    ],
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "Backend Developer",
    department: "Yazılım Geliştirme",
    location: "İstanbul (Uzaktan)",
    type: "Tam Zamanlı",
    experience: "3+ Yıl",
    description: "Node.js ve Python ile backend sistemleri geliştirecek deneyimli bir yazılımcı arıyoruz.",
    requirements: [
      "Node.js veya Python ile 3+ yıl deneyim",
      "PostgreSQL ve MongoDB bilgisi",
      "Microservices mimarisi deneyimi",
      "Docker ve Kubernetes tecrübesi",
      "API tasarımı ve dokümantasyonu",
    ],
    color: "from-blue-400 to-purple-500",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    department: "Tasarım",
    location: "İstanbul (Hibrit)",
    type: "Tam Zamanlı",
    experience: "4+ Yıl",
    description: "Kullanıcı deneyimini ön planda tutan, yaratıcı ve yenilikçi tasarımlar üretecek bir UI/UX Designer arıyoruz.",
    requirements: [
      "Figma ve Adobe XD ile 4+ yıl deneyim",
      "Web ve mobil uygulama tasarımı tecrübesi",
      "Kullanıcı araştırması ve usability testing",
      "Design system oluşturma deneyimi",
      "Prototipleme ve wireframing becerileri",
    ],
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    department: "Altyapı",
    location: "İstanbul (Uzaktan)",
    type: "Tam Zamanlı",
    experience: "4+ Yıl",
    description: "Bulut altyapımızı yönetecek ve geliştirme süreçlerini optimize edecek bir DevOps Engineer arıyoruz.",
    requirements: [
      "AWS, GCP veya Azure deneyimi",
      "Docker ve Kubernetes uzmanlığı",
      "CI/CD pipeline tasarımı ve yönetimi",
      "Infrastructure as Code (Terraform)",
      "Linux sistem yönetimi",
    ],
    color: "from-pink-400 to-red-500",
  },
  {
    id: 5,
    title: "Mobile Developer",
    department: "Yazılım Geliştirme",
    location: "İstanbul (Hibrit)",
    type: "Tam Zamanlı",
    experience: "3+ Yıl",
    description: "React Native ile cross-platform mobil uygulamalar geliştirecek bir Mobile Developer arıyoruz.",
    requirements: [
      "React Native ile 3+ yıl deneyim",
      "iOS ve Android platform bilgisi",
      "State management tecrübesi",
      "Native modül geliştirme deneyimi",
      "App Store ve Play Store yayınlama süreçleri",
    ],
    color: "from-red-400 to-orange-500",
  },
  {
    id: 6,
    title: "Proje Yöneticisi",
    department: "Proje Yönetimi",
    location: "İstanbul (Ofis)",
    type: "Tam Zamanlı",
    experience: "5+ Yıl",
    description: "Yazılım projelerini baştan sona yönetecek, deneyimli bir Proje Yöneticisi arıyoruz.",
    requirements: [
      "IT proje yönetiminde 5+ yıl deneyim",
      "Agile/Scrum metodolojilerine hakimiyet",
      "PMP veya Scrum sertifikası",
      "Güçlü iletişim ve liderlik becerileri",
      "Teknik geçmiş tercih sebebi",
    ],
    color: "from-orange-400 to-yellow-500",
  },
];

export default function Ilanlar() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("Tümü");

  const departments = ["Tümü", ...new Set(jobs.map(job => job.department))];
  const filteredJobs = filter === "Tümü" ? jobs : jobs.filter(job => job.department === filter);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium mb-6">
              Kariyer Fırsatları
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ekibimize <span className="gradient-text">Katılın</span>
            </h1>
            <p className="text-xl text-slate-400">
              Tutkulu ve yetenekli profesyonelleri büyüyen ekibimize davet ediyoruz. Geleceği birlikte şekillendirelim.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "💰", title: "Rekabetçi Maaş", desc: "Piyasa üstü ücret politikası" },
              { icon: "🏠", title: "Esnek Çalışma", desc: "Hibrit ve uzaktan seçenekleri" },
              { icon: "📚", title: "Eğitim Desteği", desc: "Sürekli gelişim fırsatları" },
              { icon: "🎯", title: "Kariyer Gelişimi", desc: "Net kariyer yol haritası" },
            ].map((benefit, index) => (
              <div key={index} className="glass rounded-2xl p-6 text-center card-hover">
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-400 text-sm">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Açık <span className="gradient-text">Pozisyonlar</span>
              </h2>
              <p className="text-slate-400 mt-2">{filteredJobs.length} açık pozisyon bulundu</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setFilter(dept)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === dept
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`glass rounded-2xl p-6 card-hover cursor-pointer border-2 transition-all duration-300 ${
                  selectedJob?.id === job.id
                    ? "border-cyan-500"
                    : "border-transparent hover:border-slate-700"
                }`}
                onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl font-bold text-white">{job.title.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                        {job.department}
                      </span>
                      <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                        {job.location}
                      </span>
                      <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                        {job.type}
                      </span>
                      <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs">
                        {job.experience}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{job.description}</p>

                    {selectedJob?.id === job.id && (
                      <div className="mt-6 pt-6 border-t border-slate-700">
                        <h4 className="text-white font-semibold mb-3">Aranan Nitelikler:</h4>
                        <ul className="space-y-2">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-400 text-sm">
                              <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2"></div>
                              {req}
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={`/iletisim?pozisyon=${encodeURIComponent(job.title)}`}
                          className="btn-primary inline-block mt-6 text-center"
                        >
                          Başvur
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">Süreç</span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Başvuru <span className="gradient-text">Süreci</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Başvuru", desc: "Online formumuzdan veya e-posta ile başvurun" },
              { step: "2", title: "Değerlendirme", desc: "CV ve portfolyonuzu inceliyoruz" },
              { step: "3", title: "Mülakat", desc: "Teknik ve HR mülakatları gerçekleştiriyoruz" },
              { step: "4", title: "Teklif", desc: "Başarılı adaylara iş teklifi sunuyoruz" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
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
              Aradığınız Pozisyon <span className="gradient-text">Yok mu?</span>
            </h2>
            <p className="text-slate-400 mb-8">
              Açık pozisyonlar dışında da yetenekli adayları değerlendiriyoruz. CV'nizi gönderin, uygun pozisyon açıldığında sizinle iletişime geçelim.
            </p>
            <Link href="/iletisim" className="btn-primary inline-block">
              Genel Başvuru Yap
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

