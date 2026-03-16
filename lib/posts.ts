import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostMeta, PostWithContent } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts')

function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return []

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.mdx'))

  const posts = files.map((filename) => {
    const filePath = path.join(POSTS_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      title: data.title as string,
      slug: data.slug ?? filename.replace('.mdx', ''),
      category: data.category,
      coverImage: data.coverImage,
      publishedAt: data.publishedAt as string,
      readingTime: data.readingTime ?? calculateReadingTime(content),
      excerpt: data.excerpt as string,
    } satisfies PostMeta
  })

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null

  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)

  return {
    title: data.title as string,
    slug: data.slug ?? slug,
    category: data.category,
    coverImage: data.coverImage,
    publishedAt: data.publishedAt as string,
    readingTime: data.readingTime ?? calculateReadingTime(content),
    excerpt: data.excerpt as string,
    content,
  }
}
