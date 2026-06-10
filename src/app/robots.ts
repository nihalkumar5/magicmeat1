import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/cart', '/checkout', '/account/'],
    },
    sitemap: 'https://magicmeat.in/sitemap.xml',
  }
}
