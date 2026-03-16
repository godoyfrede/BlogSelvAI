import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypePrettyCode, { Options } from 'rehype-pretty-code'
import { CopyButton } from './CopyButton'
import React from 'react'
import Image from 'next/image'

// Obter texto bruto (raw text) de dentro do React node para permitir cópia
const extractTextFromNode = (node: React.ReactNode): string => {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return React.Children.toArray(node.props.children).map(extractTextFromNode).join('')
  }
  if (Array.isArray(node)) {
    return node.map(extractTextFromNode).join('')
  }
  return ''
}

const components = {
  h2: ({ children, ...props }: any) => (
    <h2 className="font-display font-bold text-3xl mt-12 mb-6 text-fg" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="font-display font-bold text-2xl mt-10 mb-4 text-fg" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="font-sans text-[18px] leading-[1.75] mb-6 text-fg/90" {...props}>
      {children}
    </p>
  ),
  a: ({ children, ...props }: any) => (
    <a 
      className="text-accent underline decoration-accent/50 underline-offset-4 hover:opacity-80 transition-opacity font-medium" 
      {...props}
    >
      {children}
    </a>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-[3px] border-accent pl-5 my-8 italic text-fg/80" {...props}>
      {children}
    </blockquote>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-outside ml-6 mb-6 space-y-2 font-sans text-[18px] leading-[1.75] text-fg/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 font-sans text-[18px] leading-[1.75] text-fg/90" {...props}>
      {children}
    </ol>
  ),
  hr: (props: any) => (
    <hr className="my-10 border-t border-border opacity-20" {...props} />
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-fg" {...props}>
      {children}
    </strong>
  ),
  img: (props: any) => {
    return (
      <span className="block my-10">
        <span className="block relative w-full rounded-md overflow-hidden aspect-video">
          <Image
            src={props.src}
            alt={props.alt || ''}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 680px"
          />
        </span>
        {props.alt && (
          <span className="block text-center text-sm font-sans mt-3 text-muted">
            {props.alt}
          </span>
        )}
      </span>
    )
  },
  pre: ({ children, ...props }: any) => {
    // rehype-pretty-code should pass already highlighted code inside 'code'
    // This pre wrapper handles the copy button and dark styling
    const rawText = extractTextFromNode(children)
    
    // Look for a language tag attached by rehype-pretty-code
    const language = props['data-language'] || ''
    
    return (
      <div className="relative group my-8 rounded-lg overflow-hidden bg-[#1A1A1A] border border-[#2A2A27]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#222222] border-b border-[#333333]">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider font-medium">
            {language || 'Código'}
          </span>
          <CopyButton text={rawText} />
        </div>
        <pre className="p-4 overflow-x-auto text-[14px] leading-relaxed font-mono text-gray-200" {...props}>
          {children}
        </pre>
      </div>
    )
  },
  code: ({ children, ...props }: any) => {
    // If it's an inline code (not wrapped in pre), style it differently
    const isInline = !props.className?.includes('language-') && !props['data-language']
    
    if (isInline) {
      return (
        <code className="px-1.5 py-0.5 rounded-md bg-[#1A1A1A] text-accent/90 font-mono text-[0.9em] border border-[#2A2A27]" {...props}>
          {children}
        </code>
      )
    }
    
    return <code {...props}>{children}</code>
  }
}

// Configuração do rehype-pretty-code
const prettyCodeOptions: Options = {
  theme: 'vitesse-dark', // Um tema escuro elegante que combina com background de terminal `#1A1A1A`
  keepBackground: false, // Nós controlaremos o background via parent <pre>
}

interface MDXContentProps {
  source: string
}

export function MDXContent({ source }: MDXContentProps) {
  return (
    <article className="w-full max-w-[680px] mx-auto px-5 sm:px-0 animate-fade-in delay-400">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
          },
        }}
      />
    </article>
  )
}
