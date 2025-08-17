"use client"

import { Play, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeroSectionProps {
  movie: any
  onPlayClick: () => void
}

export function HeroSection({ movie, onPlayClick }: HeroSectionProps) {
  if (!movie) return null

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-bold font-work-sans mb-4 text-foreground">{movie.title}</h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 line-clamp-3">{movie.overview}</p>

            <div className="flex items-center space-x-4">
              <Button
                size="lg"
                onClick={onPlayClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-border hover:bg-card text-foreground bg-transparent"
              >
                <Info className="w-5 h-5 mr-2" />
                More Info
              </Button>
            </div>

            <div className="flex items-center space-x-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                {Math.floor(movie.vote_average * 10) / 10}/10
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="px-2 py-1 bg-card rounded text-xs">HD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
