"use client"

export default function Loader() {
  return (
    <div className="flex items-center justify-center mt-16">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-300 text-sm">
          Analyzing audience sentiment...
        </p>
      </div>
    </div>
  )
}