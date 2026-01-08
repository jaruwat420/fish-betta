'use client';

import { useState } from 'react';
import AuthButton from './AuthButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'หน้าแรก', href: '/' },
    { name: 'สินค้าทั้งหมด', href: '/products' },
    { name: 'เกี่ยวกับเรา', href: '/about' },
    { name: 'วิธีการเลี้ยง', href: '/care-guide' },
    { name: 'ติดต่อเรา', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-lg backdrop-blur-md bg-opacity-90 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🐟</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              BettaLuxury
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-cyan-600 transition-colors duration-200 font-medium relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <AuthButton />

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="w-6 h-0.5 bg-gray-700 mb-1.5 transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-700 mb-1.5 transition-all duration-300"></div>
            <div className="w-6 h-0.5 bg-gray-700 transition-all duration-300"></div>
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-cyan-600 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <a
                href="/register"
                className="block w-full px-6 py-2 text-center text-cyan-600 border-2 border-cyan-600 rounded-full hover:bg-cyan-600 hover:text-white transition-all duration-300 font-medium"
              >
                สมัครสมาชิก
              </a>
              <a
                href="/login"
                className="block w-full px-6 py-2 text-center bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
              >
                เข้าสู่ระบบ
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}