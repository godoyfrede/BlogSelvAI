import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-5 text-center">
      <h1 className="font-display text-8xl md:text-9xl font-bold text-accent mb-6 select-none opacity-90 drop-shadow-md">
        404
      </h1>
      <h2 className="font-display text-3xl md:text-4xl mb-6 text-fg">
        Artigo não encontrado
      </h2>
      <p className="font-sans text-muted mb-10 max-w-md mx-auto text-lg leading-relaxed">
        Não conseguimos encontrar a leitura que você está procurando no ecossistema da Selv.AI. Ela pode ter sido removida ou o endereço está incorreto.
      </p>
      <Link 
        href="/"
        className="inline-flex items-center space-x-2 text-fg hover:text-accent font-medium font-sans pb-1 border-b border-transparent hover:border-accent transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Voltar para o Início</span>
      </Link>
    </div>
  )
}
