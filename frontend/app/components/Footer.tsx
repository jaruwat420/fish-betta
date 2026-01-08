export default function Footer() {
  const footerLinks = {
    company: [
      { name: 'เกี่ยวกับเรา', href: '/about' },
      { name: 'ติดต่อเรา', href: '/contact' },
      { name: 'Blog', href: '/blog' },
      { name: 'ร่วมงานกับเรา', href: '/careers' },
    ],
    product: [
      { name: 'สินค้าทั้งหมด', href: '/products' },
      { name: 'Halfmoon', href: '/products/halfmoon' },
      { name: 'Plakat', href: '/products/plakat' },
      { name: 'Crowntail', href: '/products/crowntail' },
    ],
    support: [
      { name: 'วิธีการเลี้ยง', href: '/care-guide' },
      { name: 'คำถามที่พบบ่อย', href: '/faq' },
      { name: 'จัดส่งสินค้า', href: '/shipping' },
      { name: 'รับประกัน', href: '/warranty' },
    ],
    legal: [
      { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy' },
      { name: 'เงื่อนไขการให้บริการ', href: '/terms' },
      { name: 'การคืนสินค้า', href: '/returns' },
      { name: 'นโยบายคุกกี้', href: '/cookies' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', href: '#', icon: '📘' },
    { name: 'Instagram', href: '#', icon: '📷' },
    { name: 'Line', href: '#', icon: '💬' },
    { name: 'TikTok', href: '#', icon: '🎵' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🐟</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">BettaLuxury</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              สุดยอดร้านขายปลากัดคุณภาพเยี่ยม คัดสรรอย่างพิถีพิถัน เพื่อคนรักปลากัดโดยเฉพาะ
              มั่นใจในคุณภาพและบริการที่ดีที่สุด
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100">บริษัท</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100">สินค้า</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100">ช่วยเหลือ</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-gray-100">ข้อกำหนด</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 BettaLuxury. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Made with 💙 using Next.js and Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}