import Layout from '../components/Layout';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with modern technologies and best practices",
      icon: "🌐",
      features: ["Responsive Design", "Progressive Web Apps", "E-commerce Solutions", "CMS Development"],
      price: "Starts at $5,000"
    },
    {
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      icon: "📱",
      features: ["iOS Development", "Android Development", "React Native", "Flutter Apps"],
      price: "Starts at $8,000"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that delight users and drive engagement",
      icon: "🎨",
      features: ["User Research", "Wireframing", "Prototyping", "Design Systems"],
      price: "Starts at $3,000"
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and migration services",
      icon: "☁️",
      features: ["AWS Services", "Google Cloud", "Azure", "DevOps Setup"],
      price: "Starts at $4,000"
    },
    {
      title: "Digital Marketing",
      description: "Comprehensive digital marketing strategies to grow your online presence",
      icon: "📈",
      features: ["SEO Optimization", "Social Media Marketing", "Content Marketing", "PPC Campaigns"],
      price: "Starts at $2,000/month"
    },
    {
      title: "Consulting",
      description: "Expert technology consulting to guide your digital transformation",
      icon: "💡",
      features: ["Technical Strategy", "Architecture Design", "Performance Optimization", "Security Audits"],
      price: "Starts at $200/hour"
    }
  ];

  const process = [
    { step: 1, title: "Discovery", description: "We understand your needs and goals" },
    { step: 2, title: "Planning", description: "Detailed project roadmap and timeline" },
    { step: 3, title: "Development", description: "Agile development with regular updates" },
    { step: 4, title: "Testing", description: "Thorough quality assurance testing" },
    { step: 5, title: "Deployment", description: "Smooth launch and deployment" },
    { step: 6, title: "Support", description: "Ongoing maintenance and support" }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive solutions to help your business thrive in the digital landscape.
            From concept to execution, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover-lift group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

              <ul className="mb-6 space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-gray-200">
                <div className="text-lg font-semibold text-blue-600 mb-4">{service.price}</div>
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How We Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Let's discuss how our services can help transform your business and achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold">
              Schedule a Consultation
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold">
              View Portfolio
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}