"use client"

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import MovieCard from "@/components/MovieCard"
import Loader from "@/components/Loader"

export default function Home() {
  const [movie, setMovie] = useState(null)
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchMovie = async (id: string) => {
    setLoading(true)
    setMovie(null)

    const res = await fetch("/api/movie", {
      method: "POST",
      body: JSON.stringify({ imdbId: id }),
    })

    const data = await res.json()

    setLoading(false)

    if (!data.error) {
      setMovie(data.movie)
      setSummary(data.aiSummary)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-center tracking-wide">
        AI Movie Insight Builder 🎬
      </h1>

      <SearchBar onSearch={fetchMovie} />

      {loading && <Loader />}

      {movie && (
        <MovieCard movie={movie} summary={summary} />
      )}
    </div>
  )
}