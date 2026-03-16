'use client'

import { useState } from 'react'
import { PostMeta, Category } from '@/types/post'
import CategoryPills from '@/components/CategoryPills'
import PostCard from '@/components/PostCard'
import EmptyState from '@/components/EmptyState'
import NewsletterBlock from '@/components/NewsletterBlock'

interface HomePageClientProps {
  initialPosts: PostMeta[]
}

export default function HomePageClient({ initialPosts }: HomePageClientProps) {
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos')

  const filteredPosts =
    activeCategory === 'Todos'
      ? initialPosts
      : initialPosts.filter((p) => p.category === activeCategory)

  // Em um app real com paginação, pegaríamos os 9 primeiros da página atual.
  const displayPosts = filteredPosts.slice(0, 9)

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16 md:py-24 flex flex-col gap-16 md:gap-24">
      {/* Hero Section */}
      <section className="flex flex-col gap-6 max-w-3xl animate-fade-slide-up delay-100">
        <h1
          className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
        >
          Onde o design encontra a <span style={{ color: 'var(--color-accent)' }}>inteligência</span>.
        </h1>
        <p
          className="text-lg md:text-xl leading-relaxed max-w-2xl"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
        >
          Explore ensaios, tutoriais e análises sobre UX, desenvolvimento frontend e
          o impacto da IA nos produtos digitais brasileiros.
        </p>
      </section>

      {/* Main Content Area */}
      <section className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="sr-only">Explorar Artigos</h2>
          <CategoryPills active={activeCategory} onChange={setActiveCategory} />
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayPosts.length > 0 ? (
            displayPosts.map((post, index) => (
              <PostCard key={post.slug} post={post} index={index} />
            ))
          ) : (
            <EmptyState category={activeCategory} />
          )}
        </div>
      </section>

      {/* Newsletter */}
      <div className="animate-fade-slide-up delay-500">
        <NewsletterBlock />
      </div>
    </div>
  )
}
