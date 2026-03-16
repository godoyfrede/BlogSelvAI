'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { NEWSLETTER_ENDPOINT } from '@/lib/config'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function NewsletterBlock() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg('Por favor, insira um e-mail válido.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch(NEWSLETTER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) {
          // Treated as success basically for UX
          setStatus('success')
          // Optional: We could set a different success message for already subscribed, 
          // but we'll use a standard one for now, or just let the success block show standard.
          return
        }
        throw new Error(data.message || 'Falha no servidor')
      }
      
      setStatus('success')
    } catch (err: any) {
      setErrorMsg(err.message || 'Algo deu errado. Tente novamente em alguns minutos.')
      setStatus('error')
    }
  }

  return (
    <section
      className="rounded-[6px] border px-8 py-10 md:px-12 md:py-14 flex flex-col gap-5"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
      aria-label="Assinar newsletter Selv.AI"
    >
      <div className="flex flex-col gap-2 max-w-lg">
        <h2
          className="text-2xl md:text-3xl leading-tight"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
        >
          Receba conteúdo Selv.AI toda semana.
        </h2>
        <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
          Design, código e IA para quem constrói o futuro digital brasileiro.
        </p>
      </div>

      {status === 'success' ? (
        <div
          className="text-sm font-medium px-4 py-3 rounded-[6px] border"
          style={{
            borderColor: 'var(--color-accent)',
            color: 'var(--color-fg)',
            backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)',
            fontFamily: 'var(--font-sans)',
          }}
          role="status"
          aria-live="polite"
        >
          ✅ Confirme seu e-mail! 📬
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md" noValidate>
          <div className="flex flex-col gap-1.5 flex-1">
            <label htmlFor="newsletter-email" className="sr-only">
              Seu endereço de e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (status === 'error') setStatus('idle')
              }}
              className="w-full px-4 py-2.5 rounded-[6px] border text-sm outline-none transition-colors duration-150"
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor: status === 'error' ? '#ef4444' : 'var(--color-border)',
                color: 'var(--color-fg)',
                fontFamily: 'var(--font-sans)',
              }}
              aria-describedby={status === 'error' ? 'newsletter-error' : undefined}
              disabled={status === 'loading'}
              required
            />
            {status === 'error' && errorMsg && (
              <p id="newsletter-error" className="text-xs text-red-500" role="alert">
                {errorMsg}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-[6px] text-sm font-semibold transition-all duration-150 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-fg)',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {status === 'loading' ? (
              <>
                <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                Aguarde...
              </>
            ) : (
              'Assinar'
            )}
          </button>
        </form>
      )}

      <p className="text-xs" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
        Sem spam. Cancele quando quiser.{' '}
        <Link href="/privacidade" className="underline hover:text-fg transition-colors">
          Política de Privacidade
        </Link>
        .
      </p>
    </section>
  )
}
