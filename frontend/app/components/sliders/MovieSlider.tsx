'use client';

import { useState } from 'react';

interface Movie {
  title: string;
  description: string;
  image: string;
  rating: string;
  genre: string;
}

interface MovieSliderProps {
  movies: Movie[];
}

export default function MovieSlider({ movies }: MovieSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="max-w-4xl mx-auto mb-16">
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-red-500/20">
        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            className="p-3 bg-red-600/80 hover:bg-red-600 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Previous movie"
          >
            <span className="text-2xl">←</span>
          </button>

          <div className="text-center flex-1 mx-8">
            <div className="text-6xl mb-4">{movies[currentSlide].image}</div>
            <h3 className="text-2xl font-bold mb-2">{movies[currentSlide].title}</h3>
            <p className="text-gray-300 mb-3">{movies[currentSlide].description}</p>
            <div className="flex justify-center gap-4">
              <span className="px-3 py-1 bg-yellow-500 text-black rounded-full text-sm font-semibold">
                ⭐ {movies[currentSlide].rating}
              </span>
              <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold">
                {movies[currentSlide].genre}
              </span>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="p-3 bg-red-600/80 hover:bg-red-600 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Next movie"
          >
            <span className="text-2xl">→</span>
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-red-500 w-8' : 'bg-white/50'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}