'use client'

import Link from 'next/link'
import { FolderOpen } from 'lucide-react'

interface EmptyStateProps {
  category: string
}

export default function EmptyState({ category }: EmptyStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
      <FolderOpen
        size={40}
        style={{ color: 'var(--color-muted)' }}
        aria-hidden="true"
      />
      <div className="flex flex-col gap-2">
        <p
          className="text-lg"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
        >
          Ainda sem posts em &ldquo;{category}&rdquo;.
        </p>
        <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          Em breve, muito conteúdo por aqui!
        </p>
      </div>
      <Link
        href="/"
        className="mt-2 text-sm font-medium px-4 py-2 rounded-[6px] border transition-all duration-150"
        style={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-fg)',
          fontFamily: 'var(--font-sans)',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent)'
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.color = 'var(--color-accent-fg)'
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-fg)'
        }}
      >
        Ver todos os posts
      </Link>
    </div>
  )
}
