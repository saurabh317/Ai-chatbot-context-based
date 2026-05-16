"use client";

import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function RouteNotFound() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6 overflow-hidden">
      {/* Glow background */}
      <div className="absolute w-72 h-72 bg-purple-500/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      {/* Icon */}
      <div className="mb-6 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md">
        <AlertTriangle className="w-8 h-8 text-purple-400" />
      </div>

      {/* 404 */}
      <h1 className="text-7xl md:text-9xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
        404
      </h1>

      {/* Title */}
      <h2 className="mt-4 text-2xl md:text-3xl font-semibold text-center">
        Page Not Found
      </h2>

      {/* Description */}
      <p className="mt-2 text-gray-400 text-center max-w-md">
        The page you are looking for doesn’t exist or might have been moved.
        Let’s get you back on track.
      </p>

      {/* Actions */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </button>

        <Link
          href="/"
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:opacity-90 transition"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
