"use client"

import { useState } from "react"
import { TrendingUp, Star, Clock, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  onCategorySelect: (category: string) => void
  activeCategory: string
}

export function Sidebar({ onCategorySelect, activeCategory }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  const categories = [
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "popular", label: "Popular", icon: Star },
    { id: "top_rated", label: "Top Rated", icon: Star },
    { id: "upcoming", label: "Upcoming", icon: Clock },
  ]

  const genres = [
    { id: "28", label: "Action" },
    { id: "12", label: "Adventure" },
    { id: "16", label: "Animation" },
    { id: "35", label: "Comedy" },
    { id: "80", label: "Crime" },
    { id: "99", label: "Documentary" },
    { id: "18", label: "Drama" },
    { id: "10751", label: "Family" },
    { id: "14", label: "Fantasy" },
    { id: "36", label: "History" },
    { id: "27", label: "Horror" },
    { id: "10402", label: "Music" },
    { id: "9648", label: "Mystery" },
    { id: "10749", label: "Romance" },
    { id: "878", label: "Sci-Fi" },
    { id: "10770", label: "TV Movie" },
    { id: "53", label: "Thriller" },
    { id: "10752", label: "War" },
    { id: "37", label: "Western" },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-20 left-4 z-50 md:hidden bg-card/80 backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out z-40 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 animate-slide-in-left`}
      >
        <div className="p-4 space-y-6">
          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Categories</h3>
            <div className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon
                return (
                  <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "secondary" : "ghost"}
                    className="w-full justify-start text-sm font-medium"
                    onClick={() => {
                      onCategorySelect(category.id)
                      setIsOpen(false)
                    }}
                  >
                    <Icon className="mr-3 h-4 w-4" />
                    {category.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Genres */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Genres</h3>
            <div className="space-y-1">
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant={activeCategory === `genre-${genre.id}` ? "secondary" : "ghost"}
                  className="w-full justify-start text-sm font-medium"
                  onClick={() => {
                    onCategorySelect(`genre-${genre.id}`)
                    setIsOpen(false)
                  }}
                >
                  {genre.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
