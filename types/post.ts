export type Category =
  | 'UX/UI & Design'
  | 'Dev & Tech'
  | 'IA & Automação'
  | 'Produto & Carreira'

export const CATEGORIES: Category[] = [
  'UX/UI & Design',
  'Dev & Tech',
  'IA & Automação',
  'Produto & Carreira',
]

export interface PostMeta {
  title: string
  slug: string
  category: Category
  coverImage?: string
  publishedAt: string
  readingTime: number
  excerpt: string
  commentCount?: number
}

export interface PostWithContent extends PostMeta {
  content: string
}
