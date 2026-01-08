'use client';

import { useState, useEffect } from 'react';

interface BettaFish {
  id: string;
  name: string;
  type: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  traits: string[];
  badge?: string;
}

interface BettaSliderProps {
  bettas: BettaFish[];
}

export default function BettaSlider({ bettas }: BettaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bettas.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, bettas.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + bettas.length) % bettas.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % bettas.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentBetta = bettas[currentIndex];

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-cyan-100 via-blue-100 to-purple-100 rounded-2xl flex items-center justify-center text-9xl shadow-inner">
              {currentBetta.image}
            </div>
            {currentBetta.badge && (
              <div className="absolute top-6 right-6 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                {currentBetta.badge}
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-center">
            <div className="text-sm font-bold text-cyan-600 mb-2 uppercase tracking-wide">
              {currentBetta.type}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {currentBetta.name}
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {currentBetta.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentBetta.traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-sm font-semibold"
                >
                  {trait}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ฿{currentBetta.price.toLocaleString()}
              </div>
              {currentBetta.originalPrice && (
                <div className="text-xl text-gray-400 line-through">
                  ฿{currentBetta.originalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button className="flex-1 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                🛒 สั่งซื้อเลย
              </button>
              <button className="px-6 py-4 border-2 border-cyan-500 text-cyan-600 rounded-full font-bold hover:bg-cyan-50 transition-all duration-300">
                ♡
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-white hover:scale-110 transition-all duration-300"
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 gap-3">
        {bettas.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 w-8'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
