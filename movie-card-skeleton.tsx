export function MovieCardSkeleton() {
  return (
    <div className="bg-card rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-[2/3] bg-muted" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-muted rounded" />
        <div className="h-3 bg-muted rounded w-1/2" />
      </div>
    </div>
  )
}
