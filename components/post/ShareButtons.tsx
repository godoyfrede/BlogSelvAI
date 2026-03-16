'use client'

import { Twitter, Linkedin, Link as LinkIcon } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div className="flex items-center space-x-4 py-8 border-t border-border mt-12 mb-8">
      <span className="text-sm font-medium text-muted">Compartilhar artigo:</span>
      <div className="flex items-center space-x-2">
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-accent hover:text-[#0D0D0D] transition-colors border border-border"
          aria-label="Compartilhar no X (Twitter)"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-accent hover:text-[#0D0D0D] transition-colors border border-border"
          aria-label="Compartilhar no LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </a>
        <button
          onClick={handleCopyLink}
          className="p-2 rounded-full hover:bg-surface transition-colors border border-border flex items-center justify-center relative"
          aria-label="Copiar link"
        >
          <LinkIcon className="w-4 h-4" />
          {copied && (
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-fg text-bg text-[10px] font-bold px-2 py-1 rounded">
              Copiado!
            </span>
          )}
        </button>
      </div>
    </div>
  )
}
