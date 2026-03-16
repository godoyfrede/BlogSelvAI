import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { PostHeader } from '@/components/post/PostHeader'
import { PostCover } from '@/components/post/PostCover'
import { MDXContent } from '@/components/post/MDXContent'
import { ShareButtons } from '@/components/post/ShareButtons'
import { GiscusComments } from '@/components/post/GiscusComments'
import { RelatedPosts } from '@/components/post/RelatedPosts'
import { ReadingProgress } from '@/components/post/ReadingProgress'
import NewsletterBlock from '@/components/NewsletterBlock'
import { Metadata } from 'next'
import { SITE_CONFIG } from '@/lib/config'

interface PostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: `${post.title} — ${SITE_CONFIG.name}`,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE_CONFIG.url}/posts/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${SITE_CONFIG.url}/posts/${post.slug}`,
      images: post.coverImage ? [post.coverImage] : [`${SITE_CONFIG.url}/og-home.png`],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [`${SITE_CONFIG.url}/og-home.png`],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.coverImage ? [post.coverImage] : [],
    datePublished: new Date(post.publishedAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Selv.AI',
      url: SITE_CONFIG.url,
    },
  }

  return (
    <>
      <ReadingProgress />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <main className="min-h-screen pb-16 pt-24 sm:pt-32">
        {/* Header and Cover max-width 800px to overlap constraints a little compared to text */}
        <article className="max-w-[800px] mx-auto px-5 sm:px-6">
          <PostHeader 
            title={post.title} 
            category={post.category} 
            publishedAt={post.publishedAt} 
            readingTime={post.readingTime} 
          />
          <PostCover title={post.title} coverImage={post.coverImage} />
        </article>

        {/* Content Section has its own max-w-680px constraints within MDXContent */}
        <MDXContent source={post.content} />

        {/* Post Footer elements tracking the 680px text boundary */}
        <div className="max-w-[680px] mx-auto px-5 sm:px-0">
          <ShareButtons 
            url={`${SITE_CONFIG.url}/posts/${post.slug}`} 
            title={post.title} 
          />
        </div>

        <div className="max-w-[680px] mx-auto px-5 sm:px-0 mt-8 mb-16 animate-fade-in delay-500">
          <div className="p-8 border border-border rounded-xl bg-surface/50">
            <h3 className="font-display text-2xl mb-4">Gostou da Leitura?</h3>
            <p className="text-muted mb-6">Receba mais conteúdo Selv.AI como esse toda semana.</p>
            <NewsletterBlock />
          </div>
        </div>

        <div className="max-w-[680px] mx-auto px-5 sm:px-0 relative z-10">
          <GiscusComments />
        </div>

        <RelatedPosts currentSlug={post.slug} category={post.category} />
      </main>
    </>
  )
}
