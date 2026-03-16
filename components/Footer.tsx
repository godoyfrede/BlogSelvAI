'use client'

import Link from 'next/link'
import { Github, Linkedin, Twitter } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/config'
import { CATEGORIES } from '@/types/post'

export default function Footer() {
  const year = 2026
  return (
    <footer
      className="border-t mt-24"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <span
              className="text-2xl tracking-tight"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
            >
              Selv<span style={{ color: 'var(--color-accent)' }}>.</span>AI
            </span>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>
              {SITE_CONFIG.tagline}
            </p>
            <div className="flex gap-3 mt-2">
              <a
                href={SITE_CONFIG.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub da Selv.AI"
                className="transition-colors duration-150"
                style={{ color: 'var(--color-muted)' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                <Github size={16} />
              </a>
              <a
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn da Selv.AI"
                className="transition-colors duration-150"
                style={{ color: 'var(--color-muted)' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                <Linkedin size={16} />
              </a>
              <a
                href={SITE_CONFIG.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X da Selv.AI"
                className="transition-colors duration-150"
                style={{ color: 'var(--color-muted)' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
              Categorias
            </h3>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/?category=${encodeURIComponent(cat)}`}
                className="text-sm transition-colors duration-150"
                style={{ color: 'var(--color-muted)' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
              Selv.AI
            </h3>
            <Link
              href="/"
              className="text-sm transition-colors duration-150"
              style={{ color: 'var(--color-muted)' } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              Todos os posts
            </Link>
            <a
              href="mailto:ola@selv.ai"
              className="text-sm transition-colors duration-150"
              style={{ color: 'var(--color-muted)' } as React.CSSProperties}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
            >
              Contato
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-12 pt-6 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            © {year} Selv.AI. Feito com ☕ no Brasil.
          </p>
          <p className="text-xs" style={{ color: 'var(--color-muted)' }}>
            Design. Código. Inteligência.
          </p>
        </div>
      </div>
    </footer>
  )
}
