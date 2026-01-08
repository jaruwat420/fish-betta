'use client';

import { useState } from 'react';

interface BettaFishCardProps {
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

export default function BettaFishCard({
  id,
  name,
  type,
  price,
  originalPrice,
  image,
  description,
  traits,
  badge,
}: BettaFishCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover-lift cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className="aspect-square bg-gradient-to-br from-cyan-50 to-blue-50 flex items-center justify-center text-8xl">
          {image}
        </div>
        {badge && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            {badge}
          </div>
        )}
        {originalPrice && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
            SALE
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="text-sm text-cyan-600 font-semibold mb-1">{type}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {traits.slice(0, 3).map((trait, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700 rounded-full text-xs font-medium"
            >
              {trait}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900">
              ฿{price.toLocaleString()}
            </div>
            {originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                ฿{originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
              isHovered
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-700'
            }`}
          >
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </div>
  );
}
