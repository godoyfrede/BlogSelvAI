import { useState, useEffect } from 'react'

export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      // document.documentElement.scrollTop is the distance rolled
      // document.documentElement.scrollHeight is the entire document height
      // window.innerHeight is what the user sees
      const scrollTop = document.documentElement.scrollTop || window.scrollY
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight || window.innerHeight

      const windowHeight = scrollHeight - clientHeight
      if (windowHeight === 0) {
        setProgress(0)
        return
      }

      const currentProgress = (scrollTop / windowHeight) * 100
      setProgress(Math.min(100, Math.max(0, currentProgress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Call once on mount
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return progress
}
