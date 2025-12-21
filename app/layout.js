import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "SU Tech Vision | Geleceği Şekillendiriyoruz",
  description: "Teknoloji dünyasında yenilikçi çözümler sunarak işletmenizi geleceğe taşıyoruz. Web geliştirme, mobil uygulama, yazılım çözümleri ve daha fazlası.",
  keywords: "teknoloji, yazılım, web geliştirme, mobil uygulama, dijital çözümler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className="bg-slate-950 text-white">
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
