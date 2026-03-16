'use client'

interface ErrorStateProps {
  onRetry: () => void
}

export default function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 gap-4 text-center">
      <p
        className="text-lg"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-fg)' }}
      >
        Algo deu errado ao carregar os posts.
      </p>
      <p className="text-sm" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-sans)' }}>
        Verifique sua conexão e tente novamente.
      </p>
      <button
        onClick={onRetry}
        className="mt-2 text-sm font-medium px-4 py-2 rounded-[6px] border transition-all duration-150"
        style={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-fg)',
          fontFamily: 'var(--font-sans)',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.backgroundColor = 'var(--color-accent)'
          e.currentTarget.style.borderColor = 'var(--color-accent)'
          e.currentTarget.style.color = 'var(--color-accent-fg)'
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.color = 'var(--color-fg)'
        }}
      >
        Tentar novamente
      </button>
    </div>
  )
}
