import Layout from '../components/Layout';

export default function About() {
  const team = [
    {
      name: "Alex Chen",
      role: "CEO & Founder",
      description: "Visionary leader with 15+ years in tech innovation",
      avatar: "👨‍💼"
    },
    {
      name: "Sarah Miller",
      role: "CTO",
      description: "Full-stack expert specializing in scalable architectures",
      avatar: "👩‍💻"
    },
    {
      name: "David Park",
      role: "Head of Design",
      description: "Creative mind behind our stunning user experiences",
      avatar: "🎨"
    },
    {
      name: "Emma Wilson",
      role: "Lead Developer",
      description: "Backend guru ensuring our systems run smoothly",
      avatar: "💻"
    }
  ];

  const values = [
    {
      title: "Innovation",
      description: "We push boundaries and explore new possibilities",
      icon: "🚀"
    },
    {
      title: "Quality",
      description: "Excellence in everything we build and deliver",
      icon: "✨"
    },
    {
      title: "Customer Focus",
      description: "Your success is our primary mission",
      icon: "🎯"
    },
    {
      title: "Collaboration",
      description: "Together we achieve more than we could alone",
      icon: "🤝"
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Ore-o
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're a passionate team dedicated to creating exceptional web experiences
            that transform businesses and delight users worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🌟
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower businesses with cutting-edge web solutions that drive growth,
              enhance user experiences, and create meaningful digital transformations.
              We believe in the power of technology to solve real-world problems and
              unlock new possibilities for innovation.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 hover-lift">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center text-3xl mb-6">
              🎯
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To be the global leader in innovative web solutions, setting the standard
              for quality, creativity, and technical excellence. We envision a future
              where every business, regardless of size, can access world-class digital
              solutions that help them thrive in an increasingly connected world.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover-lift">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Stats</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-purple-100">Projects Completed</div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">8+</div>
              <div className="text-pink-100">Years Experience</div>
            </div>
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl p-8 text-white text-center">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">Support Available</div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover-lift">
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}