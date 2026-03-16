export async function getGiscusCommentCount(slug: string): Promise<number | undefined> {
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO
  const category = "General" // Matching the Giscus component config used earlier

  if (!repo) {
    return undefined
  }

  // Giscus mapping="pathname" usually uses the path as the term. 
  // In our case, the path is `/posts/[slug]`. 
  // We need to match exactly what is sent by the Giscus component.
  const term = `/posts/${slug}`

  try {
    const url = new URL('https://giscus.app/api/discussions')
    url.searchParams.append('repo', repo)
    url.searchParams.append('category', category)
    url.searchParams.append('term', term)

    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 } // Revalidate every hour
    })

    if (!response.ok) {
      return undefined
    }

    const data = await response.json()
    
    // Giscus API returns the discussion node which contains `reactionCount` and `comments` or similar.
    // Actually, according to Giscus API response structure:
    // data.discussion.comments resolves to total count. 
    // If discussion doesn't exist yet, it returns an error or empty, which we'll handle gracefully.
    if (data && data.discussion && typeof data.discussion.totalCommentCount === 'number') {
      return data.discussion.totalCommentCount
    }

    return 0 // Discussion exists but no comments mapped yet, or 0 returned
  } catch (error) {
    console.error(`[Giscus] Failed to fetch comments for ${slug}:`, error)
    return undefined
  }
}
