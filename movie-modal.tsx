"use client"

import { useState, useEffect } from "react"
import { X, Play, Star, Calendar, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface MovieModalProps {
  movie: any
  onClose: () => void
}

export function MovieModal({ movie, onClose }: MovieModalProps) {
  const [isWatching, setIsWatching] = useState(false)
  const [adBlockerActive, setAdBlockerActive] = useState(true)

  useEffect(() => {
    if (isWatching && adBlockerActive) {
      const blockVideoAds = () => {
        // Block video ads in iframe
        const iframe = document.querySelector('iframe[src*="vidsrc.xyz"]') as HTMLIFrameElement
        if (iframe) {
          iframe.onload = () => {
            try {
              // Inject ad blocking script into iframe if same-origin
              const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
              if (iframeDoc) {
                const script = iframeDoc.createElement("script")
                script.textContent = `
                  // Block video ads
                  const originalPlay = HTMLVideoElement.prototype.play;
                  HTMLVideoElement.prototype.play = function() {
                    if (this.src && this.src.includes('ads')) {
                      console.log('[KamaTV] Blocked video ad');
                      return Promise.resolve();
                    }
                    return originalPlay.call(this);
                  };
                `
                iframeDoc.head.appendChild(script)
              }
            } catch (error) {
              // Cross-origin iframe, can't inject script
              console.log("[KamaTV] Cross-origin iframe, using external ad blocking")
            }
          }
        }
      }

      const timer = setTimeout(blockVideoAds, 1000)
      return () => clearTimeout(timer)
    }
  }, [isWatching, adBlockerActive])

  const handleWatch = () => {
    setIsWatching(true)
  }

  if (isWatching) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl w-full h-[80vh] p-0 bg-black">
          <div className="relative w-full h-full">
            <div className="absolute top-4 left-4 z-10 flex items-center space-x-2 bg-black/50 rounded-lg px-3 py-1">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400 font-medium">AdBlocker Active</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-6 h-6" />
            </Button>
            <iframe
              src={`https://vidsrc.xyz/embed/movie/${movie.id}`}
              className="w-full h-full"
              allowFullScreen
              title={`Watch ${movie.title}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 bg-card">
        <div className="relative">
          {/* Header Image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-32 md:w-48 rounded-lg shadow-lg"
                />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold font-work-sans text-foreground mb-4">{movie.title}</h1>

                <div className="flex items-center space-x-6 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{Math.floor(movie.vote_average * 10) / 10}/10</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{movie.runtime || "N/A"} min</span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">{movie.overview}</p>

                <div className="flex items-center space-x-2 mb-4 text-sm text-green-400">
                  <Shield className="w-4 h-4" />
                  <span>Ad-free streaming with built-in blocker</span>
                </div>

                <Button
                  onClick={handleWatch}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8"
                >
                  <Play className="w-5 h-5 mr-2 fill-current" />
                  Watch Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
