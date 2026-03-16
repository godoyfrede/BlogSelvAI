'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function GiscusComments() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="py-12 mt-16 border-t border-border w-full max-w-[680px] mx-auto animate-pulse">
        <h2 className="font-display text-3xl mb-8">Discussão</h2>
        <div className="h-40 bg-surface rounded-xl"></div>
      </div>
    )
  }

  const currentTheme = resolvedTheme === 'dark' ? 'dark' : 'light'

  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID

  if (!repo || !repoId || !categoryId) {
    return (
      <section className="py-12 mt-16 border-t border-[var(--color-border)] w-full max-w-[680px] mx-auto text-center">
        <h2 className="font-display font-bold text-3xl mb-4 text-[var(--color-fg)]">
          Discussão
        </h2>
        <p className="text-[var(--color-muted)] text-sm">
          Os comentários ainda não foram configurados neste ambiente.
        </p>
      </section>
    )
  }

  return (
    <section className="py-12 mt-16 border-t border-[var(--color-border)] w-full max-w-[680px] mx-auto animate-fade-in delay-600">
      <h2 className="font-display font-bold text-3xl mb-8 text-[var(--color-fg)]">
        Discussão
      </h2>
      <Giscus
        id="comments"
        repo={repo as `${string}/${string}`}
        repoId={repoId}
        category="General"
        categoryId={categoryId}
        mapping="pathname"
        term="Faça um comentário!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={currentTheme}
        lang="pt"
        loading="lazy"
      />
    </section>
  )
}
