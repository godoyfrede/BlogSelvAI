import { Category } from '@/types/post'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PostHeaderProps {
  title: string
  category: Category
  publishedAt: string
  readingTime: number
  author?: string
}

export function PostHeader({ title, category, publishedAt, readingTime, author = 'Selv.AI Team' }: PostHeaderProps) {
  // Map category to CSS variables (same logic as PostCard)
  const categoryColors: Record<Category, { bg: string; text: string }> = {
    'UX/UI & Design': { bg: 'bg-[var(--color-cat-ux)]', text: 'text-[var(--color-cat-ux-text)]' },
    'Dev & Tech': { bg: 'bg-[var(--color-cat-dev)]', text: 'text-[var(--color-cat-dev-text)]' },
    'IA & Automação': { bg: 'bg-[var(--color-cat-ia)]', text: 'text-[var(--color-cat-ia-text)]' },
    'Produto & Carreira': { bg: 'bg-[var(--color-cat-produto)]', text: 'text-[var(--color-cat-produto-text)]' },
  }

  const tagStyle = categoryColors[category] || { bg: 'bg-surface', text: 'text-fg' }
  const formattedDate = format(new Date(publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })

  return (
    <header className="mb-10 text-center flex flex-col items-center animate-fade-slide-up delay-200">
      <span className={`px-3 py-1 text-sm font-medium rounded-full mb-6 ${tagStyle.bg} ${tagStyle.text}`}>
        {category}
      </span>
      
      <h1 
        className="font-display font-bold leading-tight mb-6 text-fg"
        style={{ fontSize: 'clamp(28px, 5vw, 48px)' }}
      >
        {title}
      </h1>
      
      <div className="flex items-center text-muted text-sm space-x-2">
        <span className="font-medium text-fg">{author}</span>
        <span>&middot;</span>
        <time dateTime={publishedAt}>{formattedDate}</time>
        <span>&middot;</span>
        <span>{readingTime} min de leitura</span>
      </div>
    </header>
  )
}
