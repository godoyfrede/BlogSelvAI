'use client'

import { Category, CATEGORIES } from '@/types/post'

interface CategoryPillsProps {
  active: Category | 'Todos'
  onChange: (cat: Category | 'Todos') => void
}

const ALL_OPTIONS: (Category | 'Todos')[] = ['Todos', ...CATEGORIES]

const DELAY_MAP: Record<number, string> = {
  0: 'delay-100',
  1: 'delay-150',
  2: 'delay-200',
  3: 'delay-250',
  4: 'delay-300',
}

export default function CategoryPills({ active, onChange }: CategoryPillsProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filtrar por categoria"
    >
      {ALL_OPTIONS.map((cat, i) => {
        const isActive = active === cat
        return (
          <button
            key={cat}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat)}
            className={`animate-fade-in ${DELAY_MAP[i] ?? 'delay-300'} px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 cursor-pointer`}
            style={{
              backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
              color: isActive ? 'var(--color-accent-fg)' : 'var(--color-muted)',
              borderColor: isActive ? 'var(--color-accent)' : 'var(--color-border)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {cat}
          </button>
        )
      })}
    </div>
  )
}
