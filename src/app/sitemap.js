export default function sitemap() {
  const baseUrl = "https://care-xyz-orcin.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/my-bookings`,
      lastModified: new Date(),
    },
  ];
}