export default function PostCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-[6px] overflow-hidden border"
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      aria-hidden="true"
    >
      {/* Image Skeleton */}
      <div className="w-full aspect-[16/9] shimmer" />

      {/* Body */}
      <div className="flex flex-col gap-3 p-5">
        {/* Category pill skeleton */}
        <div className="shimmer h-5 w-24 rounded-[4px]" />
        {/* Title skeleton */}
        <div className="shimmer h-5 w-4/5 rounded-[4px]" />
        <div className="shimmer h-5 w-3/5 rounded-[4px]" />
        {/* Excerpt */}
        <div className="shimmer h-4 w-full rounded-[4px]" />
        <div className="shimmer h-4 w-5/6 rounded-[4px]" />
        {/* Meta */}
        <div className="flex gap-4 pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <div className="shimmer h-3 w-20 rounded-[4px]" />
          <div className="shimmer h-3 w-24 rounded-[4px]" />
        </div>
      </div>
    </div>
  )
}
