import { MetadataRoute } from 'next'

// Şablondan kalma, alüminyum firmasıyla alakasız SaaS/CV-builder sayfaları.
// Bunları crawler'lara kapatıyoruz ki Google çöp/tarama bütçesi harcamasın.
const DISALLOW = [
  '/dashboard',
  '/login',
  '/register',
  '/admin',
  '/upgrade',
  '/mock-checkout',
  '/cv',
  '/jobs',
  '/discover',
  '/cover-letters',
  '/settings',
  '/api/',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: DISALLOW,
    },
    sitemap: 'https://www.cemasaluminyum.com.tr/sitemap.xml',
  }
}
