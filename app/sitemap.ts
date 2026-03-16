import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { SITE_CONFIG } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const blogUrls = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/posts/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_CONFIG.url,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...blogUrls,
  ]
}
