"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import jobService from "../services/jobService";

const employmentTypeLabels = {
  FULL_TIME: "Tam Zamanlı",
  PART_TIME: "Yarı Zamanlı",
  CONTRACT: "Sözleşmeli",
  INTERNSHIP: "Stajyer",
};

const experienceLevelLabels = {
  ENTRY: "Başlangıç",
  MID: "Orta",
  SENIOR: "Kıdemli",
  LEAD: "Lider",
};

const colors = [
  "from-cyan-400 to-blue-500",
  "from-blue-400 to-purple-500",
  "from-purple-400 to-pink-500",
  "from-pink-400 to-red-500",
  "from-red-400 to-orange-500",
  "from-orange-400 to-yellow-500",
];

export default function Ilanlar() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [filter, setFilter] = useState("Tümü");
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await jobService.getAllJobs();
      // Only show active jobs on public page
      const activeJobs = Array.isArray(data) ? data.filter(job => job.active !== false) : [];
      setJobs(activeJobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setJobs([]);
    } finally {
      setIsLoading(false);
    }
  };

  const departments = ["Tümü", ...new Set(jobs.map(job => job.companyName))];
  const filteredJobs = filter === "Tümü" ? jobs : jobs.filter(job => job.companyName === filter);

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

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-20">
              <svg className="w-20 h-20 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-400 text-lg">Şu anda açık pozisyon bulunmamaktadır.</p>
              <p className="text-slate-500 text-sm mt-2">Gelecekteki fırsatlar için CV&apos;nizi gönderebilirsiniz.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-6">
              {filteredJobs.map((job, index) => {
                const formatSalary = () => {
                  if (job.minSalary && job.maxSalary) {
                    return `${job.minSalary.toLocaleString('tr-TR')} - ${job.maxSalary.toLocaleString('tr-TR')} ₺`;
                  } else if (job.minSalary) {
                    return `${job.minSalary.toLocaleString('tr-TR')} ₺+`;
                  } else if (job.maxSalary) {
                    return `${job.maxSalary.toLocaleString('tr-TR')} ₺'e kadar`;
                  }
                  return null;
                };

                const formatDeadline = (deadline) => {
                  if (!deadline) return null;
                  try {
                    const date = new Date(deadline);
                    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
                  } catch {
                    return deadline;
                  }
                };

                return (
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
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors[index % colors.length]} flex items-center justify-center flex-shrink-0`}>
                        <span className="text-2xl font-bold text-white">{job.title?.charAt(0) || 'J'}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                            {job.companyName}
                          </span>
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                            {job.location}
                          </span>
                          <span className="px-2 py-1 rounded bg-slate-800 text-slate-300 text-xs">
                            {employmentTypeLabels[job.employmentType] || job.employmentType}
                          </span>
                          <span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs">
                            {experienceLevelLabels[job.experienceLevel] || job.experienceLevel}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm line-clamp-2">{job.description}</p>

                        {selectedJob?.id === job.id && (
                          <div className="mt-6 pt-6 border-t border-slate-700">
                            <div className="space-y-3 mb-4">
                              {formatSalary() && (
                                <div className="flex items-center gap-2 text-sm">
                                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  <span className="text-slate-300">{formatSalary()}</span>
                                </div>
                              )}
                              {job.applicationDeadline && (
                                <div className="flex items-center gap-2 text-sm">
                                  <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span className="text-slate-300">Son Başvuru: {formatDeadline(job.applicationDeadline)}</span>
                                </div>
                              )}
                            </div>
                            
                            <div className="bg-slate-800/50 rounded-lg p-4 mb-4">
                              <h4 className="text-white font-semibold mb-2">İlan Detayı:</h4>
                              <p className="text-slate-400 text-sm whitespace-pre-line">{job.description}</p>
                            </div>

                            <Link
                              href={`/iletisim?pozisyon=${encodeURIComponent(job.title)}`}
                              className="btn-primary inline-block w-full text-center"
                            >
                              Başvur
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
              Açık pozisyonlar dışında da yetenekli adayları değerlendiriyoruz. CV&apos;nizi gönderin, uygun pozisyon açıldığında sizinle iletişime geçelim.
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

