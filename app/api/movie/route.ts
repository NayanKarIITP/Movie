import { NextResponse } from "next/server"
import axios from "axios"
import { GoogleGenerativeAI } from "@google/generative-ai"

export async function POST(req: Request) {
  try {
    const { imdbId } = await req.json()

    if (!imdbId) {
      return NextResponse.json(
        { error: "IMDb ID is required" },
        { status: 400 }
      )
    }

    // Fetch movie from OMDb
    const movieRes = await axios.get(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${process.env.OMDB_API_KEY}`
    )

    const movie = movieRes.data

    if (movie.Response === "False") {
      return NextResponse.json(
        { error: "Movie not found" },
        { status: 404 }
      )
    }

    // Gemini Setup
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string)
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

    const prompt = `
    Based on this movie:
    Title: ${movie.Title}
    Plot: ${movie.Plot}
    IMDb Rating: ${movie.imdbRating}

    Provide:
    1. A 3-line audience sentiment summary.
    2. Classify overall sentiment as Positive, Mixed, or Negative.
    `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const aiResponse = response.text()

    return NextResponse.json({
      movie,
      aiSummary: aiResponse,
    })

  } catch (error: any) {
    console.error(error)
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    )
  }
}