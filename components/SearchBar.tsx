"use client"

import { useState } from "react"

interface SearchBarProps {
  onSearch: (id: string) => void
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [id, setId] = useState("")

  return (
    <div className="flex justify-center gap-4 mb-8">
      <input
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Enter IMDb ID (e.g., tt0133093)"
        className="px-4 py-2 rounded bg-white text-black outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => onSearch(id)}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  )
}