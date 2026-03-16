import { Metadata } from 'next'
import HomePageClient from './page-client'
import { getAllPosts } from '@/lib/posts'
import { SITE_CONFIG } from '@/lib/config'
import { getGiscusCommentCount } from '@/lib/giscus'

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — Blog de Tecnologia e IA`,
  description: SITE_CONFIG.description,
}

export default async function Home() {
  const rawPosts = getAllPosts()

  // Fetch comment counts parallelly at build time
  const posts = await Promise.all(
    rawPosts.map(async (post) => {
      const commentCount = await getGiscusCommentCount(post.slug)
      return { ...post, commentCount }
    })
  )

  return <HomePageClient initialPosts={posts} />
}
