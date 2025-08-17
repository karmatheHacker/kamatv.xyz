"use client"

import { MovieCard } from "./movie-card"
import { MovieCardSkeleton } from "./movie-card-skeleton"

interface MovieGridProps {
  movies: any[]
  loading: boolean
  onMovieClick: (movie: any) => void
  title: string
}

export function MovieGrid({ movies, loading, onMovieClick, title }: MovieGridProps) {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold font-work-sans mb-8 text-foreground">{title}</h2>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 animate-fade-in-up">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onMovieClick(movie)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No movies found</p>
          </div>
        )}
      </div>
    </section>
  )
}
