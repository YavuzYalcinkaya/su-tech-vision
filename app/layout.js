import { Suspense } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";
import Loading from "./loading";
import StructuredData from "./components/StructuredData";

export const metadata = {
  metadataBase: new URL("https://sutechvision.com"),
  title: {
    default: "SU Tech Vision | Güvenlik Kameraları ve IP Kamera Sistemleri",
    template: "%s | SU Tech Vision"
  },
  description: "Türkiye'nin lider güvenlik kamerası ve IP kamera sistemleri sağlayıcısı. Profesyonel CCTV, NVR, DVR kurulumu, 7/24 izleme ve teknik destek hizmetleri. Ev ve işyeri güvenlik çözümleri.",
  keywords: [
    "güvenlik kamerası",
    "güvenlik kameraları",
    "IP kamera",
    "IP kamera sistemleri",
    "CCTV kamera",
    "güvenlik sistemleri",
    "kamera sistemi kurulumu",
    "NVR kayıt cihazı",
    "DVR kayıt cihazı",
    "ev güvenlik kamerası",
    "işyeri güvenlik kamerası",
    "gece görüşlü kamera",
    "dome kamera",
    "bullet kamera",
    "PTZ kamera",
    "kablosuz güvenlik kamerası",
    "wifi kamera",
    "mobil izleme",
    "uzaktan izleme",
    "güvenlik kamerası fiyatları",
    "kamera kurulumu",
    "profesyonel güvenlik çözümleri",
    "akıllı güvenlik sistemleri",
    "yapay zeka kamera",
    "hareket algılama kamera",
    "yüz tanıma sistemi"
  ],
  authors: [{ name: "SU Tech Vision" }],
  creator: "SU Tech Vision",
  publisher: "SU Tech Vision",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://sutechvision.com",
    siteName: "SU Tech Vision",
    title: "SU Tech Vision | Güvenlik Kameraları ve IP Kamera Sistemleri",
    description: "Türkiye'nin lider güvenlik kamerası ve IP kamera sistemleri sağlayıcısı. Profesyonel kurulum ve 7/24 teknik destek.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SU Tech Vision - Güvenlik Kamera Sistemleri",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SU Tech Vision | Güvenlik Kameraları ve IP Kamera Sistemleri",
    description: "Türkiye'nin lider güvenlik kamerası ve IP kamera sistemleri sağlayıcısı.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code", // Google Search Console doğrulama kodu
  },
  alternates: {
    canonical: "https://sutechvision.com",
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <StructuredData />
      </head>
      <body className="bg-slate-950 text-white">
        <Header />
        <main className="pt-20">
          <Suspense fallback={<Loading />}>
            <PageTransition>
              {children}
            </PageTransition>
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
