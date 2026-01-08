'use client';

import { useState } from 'react';
import Layout from './components/Layout';
import BettaSlider from './components/sliders/BettaSlider';
import BettaFishCard from './components/BettaFishCard';
import FeatureCard from './components/FeatureCard';
import TestimonialCard from './components/TestimonialCard';

export default function BettaFishShop() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredBettas = [
    {
      id: 'betta-1',
      name: 'Halfmoon Red Dragon',
      type: 'Halfmoon',
      price: 890,
      originalPrice: 1200,
      image: '🐟',
      description: 'ปลากัด Halfmoon สีแดงสวยงาม ครีบทองครบสมบูรณ์ สุดยอดความสวยงาม',
      traits: ['ครีบกว้าง 180°', 'สีแดงเข้ม', 'ครีบแข็งแรง'],
      badge: 'Best Seller'
    },
    {
      id: 'betta-2',
      name: 'Plakat Galaxy',
      type: 'Plakat',
      price: 650,
      image: '🐠',
      description: 'ปลากัด Plakat กาแล็กซี่ ลายสีสวยงาม เป็นเอกลักษณ์เฉพาะตัว',
      traits: ['ลายกาแล็กซี่', 'ตัวสมบูรณ์', 'สีสันสดใส'],
      badge: 'New Arrival'
    },
    {
      id: 'betta-3',
      name: 'Crowntail Blue',
      type: 'Crowntail',
      price: 750,
      image: '🐡',
      description: 'ปลากัด Crowntail สีฟ้า ครีบเขี้ยวฟัน สวยงามแปลกตา',
      traits: ['ครีบเขี้ยวฟัน', 'สีฟ้าสด', 'ขยายพันธุ์ง่าย'],
      badge: 'Rare'
    },
    {
      id: 'betta-4',
      name: 'Giant Plakat',
      type: 'Giant',
      price: 1500,
      image: '🦈',
      description: 'ปลากัด Giant ตัวใหญ่ สุดยอดความงามและความแกร่ง',
      traits: ['ตัวใหญ่', 'สีเหลืองทอง', 'นักสู้'],
      badge: 'Premium'
    }
  ];

  const allBettas = [
    ...featuredBettas,
    {
      id: 'betta-5',
      name: 'Dumbo Ear Black',
      type: 'Dumbo Ear',
      price: 950,
      image: '🐟',
      description: 'ปลากัดหูวิญญาณ สีดำ หูใหญ่สวยงาม เป็นที่นิยมอย่างมาก',
      traits: ['หูวิญญาณ', 'สีดำเข้ม', 'สง่าน่าเกรงขาม']
    },
    {
      id: 'betta-6',
      name: 'Double Tail Red',
      type: 'Double Tail',
      price: 800,
      image: '🐠',
      description: 'ปลากัดหางคู่ สีแดงสวย ครีบแยกเป็นสองส่วนชัดเจน',
      traits: ['หางคู่', 'สีแดงสด', 'ว่ายน้ำสวย']
    },
    {
      id: 'betta-7',
      name: 'Rosetail White',
      type: 'Rosetail',
      price: 1200,
      originalPrice: 1500,
      image: '🐡',
      description: 'ปลากัดกุหลาบ สีขาว ครีบหนาและดก สวยงามหายาก',
      traits: ['ครีบกุหลาบ', 'สีขาวบริสุทธิ์', 'หายาก'],
      badge: 'Limited Edition'
    },
    {
      id: 'betta-8',
      name: 'Plakat Samurai',
      type: 'Plakat',
      price: 700,
      image: '🦈',
      description: 'ปลากัดซามูไร ลายเปลวไฟ สุดยอดนักสู้',
      traits: ['ลายเปลวไฟ', 'นักสู้', 'สีสันโดดเด่น']
    },
    {
      id: 'betta-9',
      name: 'Halfmoon Pink',
      type: 'Halfmoon',
      price: 950,
      image: '🐟',
      description: 'ปลากัด Halfmoon สีชมพู หวานละมุน สวยงามน่ารัก',
      traits: ['สีชมพู', 'ครีบกว้าง', 'น่ารัก']
    }
  ];

  const categories = [
    { id: 'all', name: 'ทั้งหมด', icon: '🐟' },
    { id: 'halfmoon', name: 'Halfmoon', icon: '🌙' },
    { id: 'plakat', name: 'Plakat', icon: '⚔️' },
    { id: 'crowntail', name: 'Crowntail', icon: '👑' },
    { id: 'giant', name: 'Giant', icon: '🦍' },
    { id: 'dumbo', name: 'Dumbo Ear', icon: '👂' }
  ];

  const features = [
    {
      icon: "💎",
      title: "คุณภาพเยี่ยม",
      description: "ปลากัดทุกตัวผ่านการคัดเลือกอย่างพิถีพิถัน สุขภาพแข็งแรง ไม่มีโรค"
    },
    {
      icon: "🚚",
      title: "จัดส่งปลอดภัย",
      description: "บรรจุภัณฑ์มาตรฐาน จัดส่งทั่วประเทศ มั่นใจได้ 100%"
    },
    {
      icon: "💰",
      title: "ราคายุติธรรม",
      description: "ราคาดีที่สุด รับประกันราคาถูกกว่าที่อื่นแน่นอน"
    },
    {
      icon: "👨‍👩‍👧‍👦",
      title: "ทีมงานมืออาชีพ",
      description: "ให้คำปรึกษา ดูแล แนะนำการเลี้ยงดูได้ตลอด 24 ชั่วโมง"
    },
    {
      icon: "🔄",
      title: "รับประกันความพอใจ",
      description: "หากปลาเจ็บป่วยภายใน 7 วัน เรายินดีเปลี่ยนตัวให้ทันที"
    },
    {
      icon: "🎁",
      title: "ของแถมมากมาย",
      description: "อาหารปลา ยาปรับสภาพน้ำ และอุปกรณ์อื่นๆ ฟรี!"
    }
  ];

  const testimonials = [
    {
      name: "คุณสมชาย ใจดี",
      comment: "ปลาสวยมากครับ สุขภาพดี ส่งไว บริการเยี่ยมมาก จะกลับมาซื้ออีกแน่นอน!",
      rating: 5,
      package: "Halfmoon Red Dragon"
    },
    {
      name: "คุณนภา รักสัตว์",
      comment: "เป็นลูกค้าครั้งแรกก็ประทับใจ ปลาสวย ราคาคุ้มค่า แนะนำเลยครับ",
      rating: 5,
      package: "Plakat Galaxy"
    },
    {
      name: "คุณวิทยา ปลาหายาก",
      comment: "หาปลาชนิดนี้มานาน สุดยอดมากครับ สภาพดีเกินคาด ขอบคุณมากครับ",
      rating: 5,
      package: "Giant Plakat"
    }
  ];

  const filteredBettas = selectedCategory === 'all'
    ? allBettas
    : allBettas.filter(betta =>
        betta.type.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section with Carousel */}
        <section className="relative bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 text-9xl opacity-10">🐟</div>
            <div className="absolute bottom-20 right-10 text-9xl opacity-10">🐠</div>
            <div className="absolute top-1/2 left-1/3 text-7xl opacity-10">🐡</div>
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                🐟 BettaLuxury
              </h1>
              <p className="text-xl md:text-2xl text-cyan-100 mb-8 max-w-3xl mx-auto">
                สุดยอดปลากัดคุณภาพเยี่ยม คัดสรรอย่างพิถีพิถัน เพื่อคนรักปลากัดโดยเฉพาะ
              </p>
            </div>

            <BettaSlider bettas={featuredBettas} />
          </div>
        </section>

        {/* Category Filter Section */}
        <section className="py-12 bg-gradient-to-br from-gray-50 to-cyan-50 sticky top-20 z-40 shadow-md">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg transform scale-105'
                      : 'bg-white text-gray-700 hover:bg-cyan-100 shadow-md'
                  }`}
                >
                  <span className="mr-2">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ปลากัดทั้งหมด
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                คัดสรรปลากัดคุณภาพเยี่ยม หลากหลายสายพันธุ์ ให้เลือกตามใจชอบ
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredBettas.map((betta) => (
                <BettaFishCard key={betta.id} {...betta} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                ทำไมต้อง BettaLuxury?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                เรามุ่งมั่นที่จะมอบปลากัดคุณภาพเยี่ยมและบริการที่ดีที่สุดให้กับคุณ
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-cyan-900 text-white">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
                รีวิวจากลูกค้าท่านอื่นๆ
              </h2>
              <p className="text-xl text-gray-300">
                คำวิจารณ์ที่ได้รับจากลูกค้าที่ไว้วางใจเรา
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={index}
                    name={testimonial.name}
                    comment={testimonial.comment}
                    rating={testimonial.rating}
                    package={testimonial.package}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🐟 พร้อมเริ่มต้นเลี้ยงปลากัดแล้วหรือยัง?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              สั่งซื้อวันนี้ รับของแถมมากมาย พร้อมบริการดูแลตลอดอายุปลา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-cyan-600 rounded-full text-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                ดูปลาทั้งหมด
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-cyan-600 transition-all duration-300">
                ติดต่อสอบถาม
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
