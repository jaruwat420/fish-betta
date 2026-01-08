'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import authService from '../../lib/auth';
import { toast } from 'sonner';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return false;
    }

    if (!formData.acceptTerms) {
      toast.error('กรุณายอมรับเงื่อนไขการใช้งาน');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      toast.success('สมัครสมาชิกสำเร็จ! กำลังนำคุณไปยังหน้าหลัก...');
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (err: any) {
      toast.error(err.message || 'สมัครสมาชิกล้มเหลว กรุณาลองอีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">🐟</span>
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              BettaLuxury
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            สมัครสมาชิก
          </h2>
          <p className="text-gray-600">
            เริ่มต้นการเดินทางกับเราวันนี้
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                ชื่อ-นามสกุล
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                placeholder="สมชาย ใจดี"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                อีเมล
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                placeholder="อย่างน้อย 6 ตัวอักษร"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                ยืนยันรหัสผ่าน
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
                placeholder="ยืนยันรหัสผ่าน"
              />
            </div>

            <div className="flex items-start">
              <input
                id="accept-terms"
                name="acceptTerms"
                type="checkbox"
                className="h-4 w-4 mt-1 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-700">
                ฉันยอมรับ{' '}
                <a href="#" className="text-cyan-600 hover:text-cyan-500 font-medium">
                  เงื่อนไขการให้บริการ
                </a>{' '}
                และ{' '}
                <a href="#" className="text-cyan-600 hover:text-cyan-500 font-medium">
                  นโยบายความเป็นส่วนตัว
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200"
            >
              {isLoading ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
            </button>

            <div className="text-center">
              <span className="text-sm text-gray-600">มีบัญชีอยู่แล้ว? </span>
              <Link
                href="/login"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-500"
              >
                เข้าสู่ระบบ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}