export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/yonetim/", "/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/yonetim/", "/api/"],
      },
    ],
    sitemap: "https://sutechvision.com/sitemap.xml",
  };
}
