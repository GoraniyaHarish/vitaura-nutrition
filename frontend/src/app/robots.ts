import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_VITAURA_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://vitauranutrition.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/cart'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
