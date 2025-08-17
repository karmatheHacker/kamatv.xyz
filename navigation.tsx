"use client"

import type React from "react"
import Image from "next/image"
import { useState } from "react"
import { Search, User, Menu, X, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"

interface NavigationProps {
  onSearch: (query: string) => void
  onLoginClick: () => void
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export function Navigation({ onSearch, onLoginClick, searchQuery, setSearchQuery }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery)
  }

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center gap-3">
            <Image src="/kamatv-logo.png" alt="KamaTV Logo" width={32} height={32} className="w-8 h-8" />
            <h1 className="text-2xl font-bold font-work-sans bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              KAMATV
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Movies
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              Series
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              My List
            </a>
          </div>

          {/* Search and User Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 bg-card border-border focus:border-primary"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </form>

            <div className="relative">
              {isAuthenticated ? (
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="hover:bg-card"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                  </Button>

                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-lg shadow-lg py-2 animate-fade-in-up">
                      <div className="px-4 py-2 border-b border-slate-800">
                        <p className="text-white font-semibold">{user?.name}</p>
                        <p className="text-slate-400 text-sm">Member since {user?.created_on}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-slate-300 hover:bg-slate-800 hover:text-white transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Button variant="ghost" size="icon" onClick={onLoginClick} className="hover:bg-card">
                  <User className="w-5 h-5" />
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="sm:hidden">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 bg-card border-border focus:border-primary"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <a href="#" className="text-foreground hover:text-primary transition-colors py-2">
                Home
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Movies
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
                Series
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors py-2">
                My List
              </a>

              {isAuthenticated && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {user?.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{user?.name}</p>
                      <p className="text-slate-400 text-xs">Member since {user?.created_on}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-slate-300 hover:text-white transition-colors flex items-center gap-2 py-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
