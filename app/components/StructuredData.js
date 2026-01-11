export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SU Tech Vision",
    alternateName: "SU Tech Vision Güvenlik Sistemleri",
    url: "https://sutechvision.com",
    logo: "https://sutechvision.com/logo.png",
    description: "Türkiye'nin lider güvenlik kamerası ve IP kamera sistemleri sağlayıcısı. Profesyonel CCTV kurulumu ve 7/24 teknik destek.",
    foundingDate: "2015",
    sameAs: [
      "https://www.facebook.com/sutechvision",
      "https://www.instagram.com/sutechvision",
      "https://www.linkedin.com/company/sutechvision",
      "https://twitter.com/sutechvision"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+90-XXX-XXX-XXXX",
      contactType: "customer service",
      areaServed: "TR",
      availableLanguage: ["Turkish", "English"]
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: "İstanbul",
      addressRegion: "İstanbul"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://sutechvision.com/#localbusiness",
    name: "SU Tech Vision - Güvenlik Kamera Sistemleri",
    image: "https://sutechvision.com/og-image.jpg",
    url: "https://sutechvision.com",
    telephone: "+90-XXX-XXX-XXXX",
    priceRange: "₺₺",
    description: "Güvenlik kamerası, IP kamera sistemleri, CCTV kurulumu ve profesyonel güvenlik çözümleri sunan lider firma.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "TR",
      addressLocality: "İstanbul",
      addressRegion: "İstanbul"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "41.0082",
      longitude: "28.9784"
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "14:00"
      }
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Güvenlik Kamera Sistemleri Kurulumu",
    provider: {
      "@type": "Organization",
      name: "SU Tech Vision"
    },
    areaServed: {
      "@type": "Country",
      name: "Türkiye"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Güvenlik Sistemleri Hizmetleri",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "IP Kamera Sistemleri",
            description: "Yüksek çözünürlüklü IP kamera kurulumu ve yapılandırması"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "CCTV Kamera Kurulumu",
            description: "Profesyonel CCTV kamera sistemi kurulumu"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "NVR/DVR Kurulumu",
            description: "Network ve dijital video kayıt cihazı kurulumu"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobil İzleme Sistemi",
            description: "Akıllı telefon üzerinden uzaktan izleme sistemi kurulumu"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Akıllı Güvenlik Sistemleri",
            description: "Yapay zeka destekli akıllı güvenlik çözümleri"
          }
        }
      ]
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SU Tech Vision",
    url: "https://sutechvision.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://sutechvision.com/arama?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Ana Sayfa",
        item: "https://sutechvision.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hizmetlerimiz",
        item: "https://sutechvision.com/hizmetlerimiz"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Güvenlik kamerası sistemleri nasıl çalışır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Güvenlik kameraları görüntüleri dijital veya analog olarak kaydeder ve NVR/DVR cihazlarına aktarır. IP kameralar ağ üzerinden, analog kameralar koaksiyel kablo üzerinden veri iletir. Uzaktan erişim sayesinde akıllı telefonunuzdan da izleme yapabilirsiniz."
        }
      },
      {
        "@type": "Question",
        name: "IP kamera ile analog kamera arasındaki fark nedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "IP kameralar dijital veri iletimi yapar ve daha yüksek çözünürlük sunar (4K'ya kadar). Ağ kablosu veya WiFi ile çalışır. Analog kameralar ise koaksiyel kablo kullanır ve genellikle daha düşük maliyetlidir. IP kameralar daha gelişmiş özellikler (hareket algılama, yüz tanıma) sunar."
        }
      },
      {
        "@type": "Question",
        name: "Kaç kameralık sistem ihtiyacım var?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Kamera sayısı mekanınızın büyüklüğüne ve güvenlik ihtiyaçlarınıza bağlıdır. Küçük evler için 4-8 kamera, orta ölçekli işletmeler için 8-16 kamera, büyük tesisler için 16+ kamera önerilir. Ücretsiz keşif hizmetimizle en uygun çözümü belirleyebiliriz."
        }
      },
      {
        "@type": "Question",
        name: "Güvenlik kamerası kurulumu ne kadar sürer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Standart ev kurulumu 4-8 saat, işyeri kurulumu 1-3 gün sürebilir. Kamera sayısı, kablolama ihtiyacı ve sistem karmaşıklığına göre bu süre değişkenlik gösterir. Profesyonel ekibimiz en kısa sürede kurulumu tamamlar."
        }
      },
      {
        "@type": "Question",
        name: "Kameralar gece görüşü yapabilir mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet, modern güvenlik kameralarımızın çoğu IR (kızılötesi) LED'ler sayesinde gece görüşü özelliğine sahiptir. Tamamen karanlık ortamlarda 30-50 metre mesafeye kadar net görüntü alabilirsiniz. Renkli gece görüşü sunan modeller de mevcuttur."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
