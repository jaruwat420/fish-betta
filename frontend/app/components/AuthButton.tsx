'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  subscription: {
    plan: string;
    status: string;
    expiresAt?: string;
  };
}

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-medium text-gray-900">{user.name}</div>
          <div className="text-xs text-gray-500">
            {user.subscription.plan} • {user.subscription.status === 'active' ? '✅' : '⏰'}
          </div>
        </div>
        <div className="relative group">
          <button className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
            <div className="px-4 py-2 border-b border-gray-200">
              <div className="text-sm font-semibold text-gray-900">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
              <div className="text-xs text-red-600 mt-1">
                {user.subscription.plan} Plan
              </div>
            </div>
            <a
              href="/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              📋 โปรไฟล์
            </a>
            <a
              href="/subscription"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              💳 แพ็กเกจ
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              🚪 ออกจากระบบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <a
        href="/login"
        className="px-6 py-2 text-red-600 border-2 border-red-600 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 font-medium"
      >
        สมัครสมาชิก
      </a>
      <a
        href="/login"
        className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
      >
        เข้าสู่ระบบ
      </a>
    </div>
  );
}