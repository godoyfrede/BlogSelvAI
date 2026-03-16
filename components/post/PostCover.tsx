'use client'

import Image from 'next/image'
import { useState } from 'react'

interface PostCoverProps {
  title: string
  coverImage?: string
}

export function PostCover({ title, coverImage }: PostCoverProps) {
  const [imgError, setImgError] = useState(false)

  // Use fallback if no image provided or image fails to load
  if (!coverImage || imgError) {
    return (
      <div className="w-full aspect-video rounded-xl bg-accent flex items-center justify-center p-8 text-center animate-fade-in mb-12">
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-[#0D0D0D] opacity-90 max-w-3xl">
          {title}
        </h2>
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-12 animate-fade-in group">
      <Image
        src={coverImage}
        alt={`Capa do artigo: ${title}`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
        onError={() => setImgError(true)}
      />
      {/* Fade inferior para suavizar a transição com a página */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-bg)] to-transparent opacity-80" />
    </div>
  )
}
