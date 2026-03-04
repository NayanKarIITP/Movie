interface Movie {
  Title: string
  Year: string
  Poster: string
  Plot: string
  imdbRating: string
}

interface MovieCardProps {
  movie: Movie
  summary: string
}

export default function MovieCard({ movie, summary }: MovieCardProps) {
  return (
    <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg grid md:grid-cols-2 gap-6">
      
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="rounded-lg"
      />

      <div>
        <h2 className="text-2xl font-bold">{movie.Title}</h2>
        <p className="text-gray-400">{movie.Year}</p>
        <p className="mt-2">⭐ {movie.imdbRating}</p>
        <p className="mt-2">{movie.Plot}</p>
        <p className="mt-4 whitespace-pre-line">{summary}</p>
      </div>

    </div>
  )
}