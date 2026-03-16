'use client'

import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const progress = useScrollProgress()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Reveal the progress bar after 500ms to avoid showing it on initial quick load flash
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      aria-hidden="true"
      className={`fixed top-[72px] left-0 w-full h-[2px] z-50 pointer-events-none transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className="h-full bg-accent"
        style={{
          width: `${progress}%`,
          transition: 'width 50ms linear',
        }}
      />
    </div>
  )
}
