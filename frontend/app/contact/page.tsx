'use client';

import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSubmitMessage('Thank you for your message! We\'ll get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      service: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email Us",
      details: ["hello@ore-o.com", "support@ore-o.com"],
      action: "Send us an email anytime!"
    },
    {
      icon: "📞",
      title: "Call Us",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      action: "Mon-Fri from 8am to 6pm EST"
    },
    {
      icon: "📍",
      title: "Visit Us",
      details: ["123 Tech Street", "San Francisco, CA 94105"],
      action: "Come say hello at our office"
    }
  ];

  const officeLocations = [
    {
      city: "San Francisco",
      country: "USA",
      address: "123 Tech Street, San Francisco, CA 94105",
      image: "🌉"
    },
    {
      city: "New York",
      country: "USA",
      address: "456 Broadway, New York, NY 10013",
      image: "🏙️"
    },
    {
      city: "London",
      country: "UK",
      address: "789 Oxford Street, London, UK W1C 1DX",
      image: "🎡"
    },
    {
      city: "Singapore",
      country: "Singapore",
      address: "321 Marina Bay, Singapore 018956",
      image: "🏙️"
    }
  ];

  const faqs = [
    {
      question: "What services do you offer?",
      answer: "We offer web development, mobile app development, UI/UX design, cloud solutions, digital marketing, and technology consulting services."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary depending on complexity. A simple website might take 4-6 weeks, while complex applications can take 3-6 months or longer."
    },
    {
      question: "Do you work with startups and small businesses?",
      answer: "Absolutely! We work with businesses of all sizes, from startups to enterprises. We offer flexible pricing plans to accommodate different budgets."
    },
    {
      question: "What technologies do you specialize in?",
      answer: "We specialize in React, Next.js, Node.js, Python, AWS, Google Cloud, and modern web technologies. We adapt our tech stack based on project requirements."
    }
  ];

  return (
    <Layout>
      <div className="py-16">
        <div className="text-center mb-16 fade-in">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have a question about our services,
            pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover-lift">
              <div className="text-4xl mb-4">{info.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{info.title}</h3>
              {info.details.map((detail, idx) => (
                <p key={idx} className="text-gray-600 mb-1">{detail}</p>
              ))}
              <p className="text-sm text-blue-600 mt-3">{info.action}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Send us a Message</h2>
            {submitMessage ? (
              <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-6">
                {submitMessage}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Service Interest</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="">Select a service</option>
                  <option value="web-development">Web Development</option>
                  <option value="mobile-app">Mobile App Development</option>
                  <option value="ui-ux">UI/UX Design</option>
                  <option value="cloud">Cloud Solutions</option>
                  <option value="marketing">Digital Marketing</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Offices</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover-lift">
                <div className="text-4xl mb-4">{office.image}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{office.city}</h3>
                <p className="text-gray-600 mb-1">{office.country}</p>
                <p className="text-sm text-gray-500">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}