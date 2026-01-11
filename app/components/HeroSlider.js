"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image: "/images/slider/slide1.jpeg",
    title: "Profesyonel Güvenlik Sistemleri",
    subtitle: "İşletmenizi 7/24 Koruma Altına Alın",
    description: "En son teknoloji güvenlik kameraları ve akıllı izleme sistemleri ile tam güvenlik.",
    buttonText: "Hizmetlerimizi Keşfedin",
    buttonLink: "/hizmetlerimiz",
  },
  {
    id: 2,
    image: "/images/slider/slide2.jpeg",
    title: "Akıllı Kamera Çözümleri",
    subtitle: "Yapay Zeka Destekli İzleme",
    description: "Hareket algılama, yüz tanıma ve anlık bildirimlerle güvenliğinizi üst seviyeye taşıyın.",
    buttonText: "Detaylı Bilgi Alın",
    buttonLink: "/iletisim",
  },
  {
    id: 3,
    image: "/images/slider/slide3.jpeg",
    title: "Kurumsal Güvenlik Danışmanlığı",
    subtitle: "Size Özel Çözümler",
    description: "Uzman ekibimizle işletmenize özel güvenlik planları ve profesyonel kurulum hizmeti.",
    buttonText: "Ücretsiz Danışmanlık",
    buttonLink: "/iletisim",
  },
];

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`relative h-screen w-full overflow-hidden transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          renderBullet: (index, className) => {
            return `<button class="${className} custom-bullet"></button>`;
          },
        }}
        loop={true}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2000ms]"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                  transform: activeIndex === index ? 'scale(1.1)' : 'scale(1)'
                }}
              >
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/30"></div>
              </div>

              {/* Content */}
              <div className="relative z-20 h-full flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-3xl">
                    {/* Subtitle Badge */}
                    <div className={`transform transition-all duration-700 ${activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                         style={{ transitionDelay: '200ms' }}>
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        {slide.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-700 ${activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                        style={{ transitionDelay: '400ms' }}>
                      {slide.title.split(" ").map((word, i) => (
                        <span key={i}>
                          {i === 1 ? (
                            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">{word} </span>
                          ) : (
                            <span>{word} </span>
                          )}
                        </span>
                      ))}
                    </h1>

                    {/* Description */}
                    <p className={`text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed transform transition-all duration-700 ${activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                       style={{ transitionDelay: '600ms' }}>
                      {slide.description}
                    </p>

                    {/* Buttons */}
                    <div className={`flex flex-wrap gap-4 transform transition-all duration-700 ${activeIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                         style={{ transitionDelay: '800ms' }}>
                      <Link 
                        href={slide.buttonLink} 
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 hover:scale-105"
                      >
                        <span className="relative z-10">{slide.buttonText}</span>
                        <svg className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      </Link>
                      <Link 
                        href="/iletisim" 
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
                      >
                        <span>İletişime Geçin</span>
                        <svg className="w-5 h-5 transform group-hover:rotate-45 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className={`swiper-button-prev-custom absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-700 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: '500ms' }}>
        <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className={`swiper-button-next-custom absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all duration-700 group ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`} style={{ transitionDelay: '500ms' }}>
        <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Custom Pagination */}
      <div className={`swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '700ms' }}></div>

      {/* Slide Counter */}
      <div className={`absolute bottom-8 right-8 z-30 hidden sm:flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/20 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '800ms' }}>
        <span className="text-2xl font-bold text-white">{String(activeIndex + 1).padStart(2, "0")}</span>
        <div className="w-8 h-0.5 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
          ></div>
        </div>
        <span className="text-sm text-white/60">{String(slides.length).padStart(2, "0")}</span>
      </div>

      {/* Bottom Progress Bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-30 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '900ms' }}>
        <div 
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-500"
          style={{ width: `${((activeIndex + 1) / slides.length) * 100}%` }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-20 right-20 w-32 h-32 border border-cyan-500/20 rounded-full animate-spin-slow z-0 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ transitionDelay: '1000ms' }}></div>
      <div className={`absolute bottom-40 left-20 w-24 h-24 border border-blue-500/20 rounded-full animate-spin-slow z-0 transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} style={{ animationDirection: 'reverse', transitionDelay: '1100ms' }}></div>
      <div className={`absolute top-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse z-0 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '1200ms' }}></div>
      <div className={`absolute bottom-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse z-0 transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ animationDelay: '1s', transitionDelay: '1300ms' }}></div>

      {/* Custom Styles */}
      <style jsx global>{`
        .custom-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(255, 255, 255, 0.3) !important;
          border-radius: 9999px !important;
          transition: all 0.3s ease !important;
          opacity: 1 !important;
        }
        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.5) !important;
        }
        .swiper-pagination-bullet-active.custom-bullet {
          width: 40px !important;
          background: linear-gradient(to right, #22d3ee, #3b82f6) !important;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
