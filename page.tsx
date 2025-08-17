"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { Sidebar } from "@/components/sidebar"
import { HeroSection } from "@/components/hero-section"
import { MovieGrid } from "@/components/movie-grid"
import { MovieModal } from "@/components/movie-modal"
import { AuthModal } from "@/components/auth-modal"
import { NoticeModal } from "@/components/notice-modal"
import { Footer } from "@/components/footer"

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<any>(null)
  const [showLogin, setShowLogin] = useState(false)
  const [showNotice, setShowNotice] = useState(true)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("trending")

  const API_KEY = "5eb9bfdc3b51661510ad81b5664d2404"

  useEffect(() => {
    if (!searchQuery) {
      fetchMoviesByCategory(activeCategory)
    }
  }, [activeCategory, searchQuery])

  const fetchMoviesByCategory = async (category: string) => {
    try {
      setLoading(true)
      let url = ""

      if (category.startsWith("genre-")) {
        const genreId = category.replace("genre-", "")
        url = `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en&api_key=${API_KEY}`
      } else {
        const endpoints = {
          trending: "trending/movie/week",
          popular: "movie/popular",
          top_rated: "movie/top_rated",
          upcoming: "movie/upcoming",
        }
        url = `https://api.themoviedb.org/3/${endpoints[category as keyof typeof endpoints]}?language=en&api_key=${API_KEY}`
      }

      const response = await fetch(url)
      const data = await response.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error("Error fetching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      fetchMoviesByCategory(activeCategory)
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`,
      )
      const data = await response.json()
      setMovies(data.results || [])
    } catch (error) {
      console.error("Error searching movies:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
    setSearchQuery("")
  }

  const getCategoryTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`

    const categoryNames = {
      trending: "Trending This Week",
      popular: "Popular Movies",
      top_rated: "Top Rated Movies",
      upcoming: "Upcoming Movies",
    }

    if (activeCategory.startsWith("genre-")) {
      const genreNames = {
        "28": "Action",
        "12": "Adventure",
        "16": "Animation",
        "35": "Comedy",
        "80": "Crime",
        "99": "Documentary",
        "18": "Drama",
        "10751": "Family",
        "14": "Fantasy",
        "36": "History",
        "27": "Horror",
        "10402": "Music",
        "9648": "Mystery",
        "10749": "Romance",
        "878": "Sci-Fi",
        "10770": "TV Movie",
        "53": "Thriller",
        "10752": "War",
        "37": "Western",
      }
      const genreId = activeCategory.replace("genre-", "")
      return `${genreNames[genreId as keyof typeof genreNames]} Movies`
    }

    return categoryNames[activeCategory as keyof typeof categoryNames] || "Movies"
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onSearch={searchMovies}
        onLoginClick={() => setShowLogin(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <Sidebar onCategorySelect={handleCategorySelect} activeCategory={activeCategory} />

      <main className="pt-16 md:ml-64">
        {!searchQuery && movies.length > 0 && (
          <HeroSection movie={movies[0]} onPlayClick={() => setSelectedMovie(movies[0])} />
        )}

        <MovieGrid movies={movies} loading={loading} onMovieClick={setSelectedMovie} title={getCategoryTitle()} />
      </main>

      <Footer />

      {selectedMovie && <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />}

      {showLogin && <AuthModal isOpen={showLogin} onClose={() => setShowLogin(false)} />}

      {showNotice && <NoticeModal onClose={() => setShowNotice(false)} />}
    </div>
  )
}
