"use client";
import { useState } from "react";

export default function Iletisim() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simüle edilmiş form gönderimi
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden bg-grid">
        <div className="absolute inset-0 bg-radial"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium mb-6">
              İletişim
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Bizimle <span className="gradient-text">İletişime Geçin</span>
            </h1>
            <p className="text-xl text-slate-400">
              Projeleriniz, sorularınız veya iş birliği önerileriniz için
              bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ),
                title: "Adres",
                info: "Maslak, Sarıyer",
                detail: "İstanbul, Türkiye",
                color: "from-cyan-400 to-blue-500",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                ),
                title: "Telefon",
                info: "+90 (212) 123 45 67",
                detail: "Pzt-Cum: 09:00 - 18:00",
                color: "from-blue-400 to-purple-500",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                ),
                title: "E-posta",
                info: "info@sutechvision.com",
                detail: "7/24 Yanıt",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                ),
                title: "Canlı Destek",
                info: "Online Chat",
                detail: "Anında Yanıt",
                color: "from-pink-400 to-red-500",
              },
            ].map((contact, index) => (
              <div
                key={index}
                className="glass rounded-2xl p-6 card-hover text-center"
              >
                <div
                  className={`w-14 h-14 mx-auto rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-white mb-4`}
                >
                  {contact.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {contact.title}
                </h3>
                <p className="text-slate-300">{contact.info}</p>
                <p className="text-slate-500 text-sm">{contact.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="glass rounded-3xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-white mb-2">
                Mesaj Gönderin
              </h2>
              <p className="text-slate-400 mb-8">
                Formu doldurun, en kısa sürede size dönelim.
              </p>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-green-400 to-cyan-500 flex items-center justify-center mb-6">
                    <svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Mesajınız Alındı!
                  </h3>
                  <p className="text-slate-400">
                    En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="Adınız Soyadınız"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        E-posta *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Telefon
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                        placeholder="+90 (5XX) XXX XX XX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Konu *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="">Seçiniz</option>
                        <option value="proje">Proje Talebi</option>
                        <option value="teklif">Fiyat Teklifi</option>
                        <option value="destek">Teknik Destek</option>
                        <option value="isbirligi">İş Birliği</option>
                        <option value="kariyer">Kariyer</option>
                        <option value="diger">Diğer</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      "Mesaj Gönder"
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Info */}
            <div className="space-y-8">
              {/* Map Placeholder */}
              <div className="glass rounded-3xl overflow-hidden h-80 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center mb-4">
                      <svg
                        className="w-8 h-8 text-cyan-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <p className="text-white font-semibold">Maslak, Sarıyer</p>
                    <p className="text-slate-400">İstanbul, Türkiye</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Çalışma Saatleri
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      day: "Pazartesi - Cuma",
                      hours: "09:00 - 18:00",
                      active: true,
                    },
                    { day: "Cumartesi", hours: "10:00 - 14:00", active: true },
                    { day: "Pazar", hours: "Kapalı", active: false },
                  ].map((schedule, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0"
                    >
                      <span className="text-slate-300">{schedule.day}</span>
                      <span
                        className={
                          schedule.active
                            ? "text-cyan-400 font-medium"
                            : "text-slate-500"
                        }
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="glass rounded-3xl p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Sosyal Medya
                </h3>
                <div className="flex gap-4">
                  {[
                    { name: "LinkedIn", color: "hover:bg-blue-600" },
                    { name: "Twitter", color: "hover:bg-sky-500" },
                    { name: "Instagram", color: "hover:bg-pink-600" },
                    { name: "YouTube", color: "hover:bg-red-600" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`flex-1 py-3 rounded-xl bg-slate-800 text-center text-slate-300 hover:text-white transition-all duration-300 ${social.color}`}
                    >
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-slate-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 text-sm font-semibold tracking-wider uppercase">
              SSS
            </span>
            <h2 className="text-4xl font-bold text-white mt-4 mb-6">
              Sıkça Sorulan <span className="gradient-text">Sorular</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Proje teklifi almak ne kadar sürer?",
                a: "Talebinizi aldıktan sonra 24-48 saat içinde sizinle iletişime geçerek detaylı bilgi alıyor ve 3-5 iş günü içinde kapsamlı bir teklif sunuyoruz.",
              },
              {
                q: "Uzaktan çalışma yapabiliyor musunuz?",
                a: "Evet, tüm projelerimizi uzaktan yönetebiliyoruz. Türkiye'nin her yerinden ve yurt dışından müşterilerimize hizmet veriyoruz.",
              },
              {
                q: "Ödeme koşulları nasıl?",
                a: "Projeleriniz için esnek ödeme planları sunuyoruz. Genellikle %30 peşin, %40 geliştirme sürecinde ve %30 teslimat sonrası olarak yapılandırılır.",
              },
              {
                q: "Proje sonrası destek sağlıyor musunuz?",
                a: "Evet, tüm projelerimize 6 aylık ücretsiz bakım ve destek hizmeti dahildir. Sonrasında uygun fiyatlı bakım anlaşmaları sunuyoruz.",
              },
            ].map((faq, index) => (
              <div key={index} className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.q}
                </h3>
                <p className="text-slate-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
