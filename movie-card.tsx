"use client"

import { Play, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
  movie: any
  onClick: () => void
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-scale-in"
      onClick={onClick}
    >
      {/* Movie Poster */}
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.svg?height=450&width=300"
          }
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button size="icon" className="bg-primary/90 hover:bg-primary text-primary-foreground rounded-full">
            <Play className="w-6 h-6 fill-current" />
          </Button>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-xs text-white font-medium">{Math.floor(movie.vote_average * 10) / 10}</span>
        </div>
      </div>

      {/* Movie Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-1">{movie.title}</h3>
        <p className="text-xs text-muted-foreground">{new Date(movie.release_date).getFullYear()}</p>
      </div>
    </div>
  )
}
