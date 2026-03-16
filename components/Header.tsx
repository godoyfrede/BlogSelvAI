'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, Github, Linkedin, Twitter, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { SITE_CONFIG } from '@/lib/config'
import { CATEGORIES } from '@/types/post'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [themeRotating, setThemeRotating] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function toggleTheme() {
    setThemeRotating(true)
    setTimeout(() => setThemeRotating(false), 300)
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b backdrop-blur-md'
          : ''
      }`}
      style={{
        backgroundColor: scrolled ? 'color-mix(in srgb, var(--color-bg) 80%, transparent)' : 'transparent',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl leading-none tracking-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
          aria-label="Selv.AI — Página inicial"
        >
          Selv<span style={{ color: 'var(--color-accent)' }}>.</span>AI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Categorias">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className="text-sm transition-colors duration-150 hover:text-fg"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
            >
              {cat}
            </Link>
          ))}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Social Links */}
          <div className="hidden sm:flex items-center gap-2">
            <a
              href={SITE_CONFIG.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub da Selv.AI"
              className="p-2 rounded-md transition-colors duration-150 hover:bg-surface"
              style={{ color: 'var(--color-muted)' } as React.CSSProperties}
            >
              <Github size={16} />
            </a>
            <a
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn da Selv.AI"
              className="p-2 rounded-md transition-colors duration-150 hover:bg-surface"
              style={{ color: 'var(--color-muted)' } as React.CSSProperties}
            >
              <Linkedin size={16} />
            </a>
            <a
              href={SITE_CONFIG.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X da Selv.AI"
              className="p-2 rounded-md transition-colors duration-150 hover:bg-surface"
              style={{ color: 'var(--color-muted)' } as React.CSSProperties}
            >
              <Twitter size={16} />
            </a>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
              className="p-2 rounded-md transition-colors duration-150 hover:bg-surface"
              style={{ color: 'var(--color-muted)' } as React.CSSProperties}
            >
              <span
                className="block"
                style={{
                  transition: 'transform 0.3s ease',
                  transform: themeRotating ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md transition-colors duration-150 hover:bg-surface"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            style={{ color: 'var(--color-muted)' } as React.CSSProperties}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileOpen && (
        <div
          className="md:hidden border-t px-6 py-5 flex flex-col gap-4"
          style={{
            backgroundColor: 'var(--color-bg)',
            borderColor: 'var(--color-border)',
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/?category=${encodeURIComponent(cat)}`}
              className="text-sm"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}
              onClick={() => setMobileOpen(false)}
            >
              {cat}
            </Link>
          ))}
          <div className="flex gap-4 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <a href={SITE_CONFIG.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" style={{ color: 'var(--color-muted)' } as React.CSSProperties}>
              <Github size={16} />
            </a>
            <a href={SITE_CONFIG.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: 'var(--color-muted)' } as React.CSSProperties}>
              <Linkedin size={16} />
            </a>
            <a href={SITE_CONFIG.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" style={{ color: 'var(--color-muted)' } as React.CSSProperties}>
              <Twitter size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
