import { getAllPosts } from '@/lib/posts'
import { Category } from '@/types/post'
import PostCard from '@/components/PostCard'

interface RelatedPostsProps {
  currentSlug: string
  category: Category
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const allPosts = getAllPosts()
  
  // Filter by category, exclude current, and get max 3
  const relatedPosts = allPosts
    .filter((post) => post.category === category && post.slug !== currentSlug)
    .slice(0, 3)

  if (relatedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-16 mt-16 border-t border-border w-full animate-fade-in delay-700">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 lg:px-8">
        <h2 className="font-display font-bold text-3xl mb-8 text-fg">
          Continue lendo
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
