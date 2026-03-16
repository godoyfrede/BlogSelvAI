import Link from 'next/link'
import Image from 'next/image'
import { Clock, Calendar, MessageSquare } from 'lucide-react'
import { PostMeta, Category } from '@/types/post'

interface PostCardProps {
  post: PostMeta
  index?: number
}

const CATEGORY_STYLES: Record<Category, { bg: string; text: string }> = {
  'UX/UI & Design': { bg: 'var(--color-cat-ux)', text: 'var(--color-cat-ux-text)' },
  'Dev & Tech':     { bg: 'var(--color-cat-dev)', text: 'var(--color-cat-dev-text)' },
  'IA & Automação': { bg: 'var(--color-cat-ia)',  text: 'var(--color-cat-ia-text)' },
  'Produto & Carreira': { bg: 'var(--color-cat-produto)', text: 'var(--color-cat-produto-text)' },
}

const DELAY_MAP: Record<number, string> = {
  0: 'delay-0', 1: 'delay-50', 2: 'delay-100',
  3: 'delay-150', 4: 'delay-200', 5: 'delay-250',
  6: 'delay-300', 7: 'delay-350', 8: 'delay-400',
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function PostCard({ post, index = 0 }: PostCardProps) {
  const catStyle = CATEGORY_STYLES[post.category]
  const titleInitial = post.title.charAt(0).toUpperCase()
  const delayClass = DELAY_MAP[index % 9] ?? 'delay-0'

  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group animate-fade-slide-up ${delayClass} flex flex-col rounded-[6px] overflow-hidden border transition-shadow duration-200 ease-out hover:shadow-[0_4px_24px_0_rgba(0,0,0,0.12)]`}
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor: 'var(--color-border)',
      }}
      aria-label={`Ler artigo: ${post.title}`}
    >
      {/* Cover Image or Fallback */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={`Capa do post: ${post.title}`}
            fill
            className="object-cover transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
              const fallback = target.nextElementSibling as HTMLElement | null
              if (fallback) fallback.style.display = 'flex'
            }}
          />
        ) : null}
        {/* Fallback */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            backgroundColor: 'var(--color-accent)',
            display: post.coverImage ? 'none' : 'flex',
          }}
          aria-hidden="true"
        >
          <span
            className="text-5xl font-bold select-none"
            style={{ color: 'var(--color-accent-fg)', fontFamily: 'var(--font-display)' }}
          >
            {titleInitial}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        {/* Category Tag */}
        <span
          className="self-start text-xs font-semibold px-2.5 py-0.5 rounded-[4px]"
          style={{
            backgroundColor: catStyle.bg,
            color: catStyle.text,
            fontFamily: 'var(--font-sans)',
          }}
        >
          {post.category}
        </span>

        {/* Title */}
        <h2
          className="text-lg leading-snug"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
        >
          <span className="hover-underline-accent">{post.title}</span>
        </h2>

        {/* Excerpt */}
        <p
          className="text-sm leading-relaxed line-clamp-2 flex-1"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
        >
          {post.excerpt}
        </p>

        {/* Meta */}
        <div
          className="flex items-center gap-4 pt-2 border-t text-xs"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-muted)' }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar size={12} aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} aria-hidden="true" />
            {post.readingTime} min de leitura
          </span>
          {post.commentCount !== undefined && (
            <span className="flex items-center gap-1.5 ml-auto">
              <MessageSquare size={12} aria-hidden="true" />
              {post.commentCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
