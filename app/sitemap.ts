import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.cemasaluminyum.com.tr'
  const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/projects', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/cambalkon', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/korkuluk', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/dusakabin', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/merdivenler', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/automatic-doors', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/shutters', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/showcase-glass', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/balconies', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/railings', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/showers', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/quote', priority: 0.8, changeFrequency: 'monthly' },
  ]

  return routes.map((r) => ({
    url: `${base}${r.path}`,
    lastModified: new Date(),
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
