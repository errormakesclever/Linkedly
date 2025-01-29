import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiMenu, FiX, FiMail, FiPhone, FiLinkedin, FiBook, FiStar, FiInfo, FiArrowUp } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  message: string;
}

const courses = [
  {
    title: "LinkedIn Profile Mastery",
    description: "Transform your profile into a powerful personal brand",
    duration: "4 weeks",
    price: "$299",
    features: ["Profile Optimization", "Keywords Strategy", "Visual Branding", "Content Planning"]
  },
  {
    title: "Professional Networking",
    description: "Build meaningful connections that drive career growth",
    duration: "6 weeks",
    price: "$399",
    features: ["Outreach Strategies", "Engagement Techniques", "Network Analysis", "Relationship Building"]
  },
  {
    title: "Content Creation Pro",
    description: "Create engaging content that resonates with your audience",
    duration: "8 weeks",
    price: "$499",
    features: ["Content Strategy", "Storytelling", "Video Creation", "Analytics"]
  }
];

const clients = [
  {
    name: "Microsoft",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBWjxuZx__a25hgj1JCqKkQF-6_UiqrUG7_g&s",
    testimonial: "Transformed our team's LinkedIn presence completely."
  },
  {
    name: "Google",
    logo: "https://yt3.googleusercontent.com/FJI5Lzbf2dMd32xOqhoKpJArJooZhoX6v2qOcFO-wjSZUvs3H9xqq2gK4DQ47X0KnYgf7X2rpdU=s900-c-k-c0x00ffffff-no-rj",
    testimonial: "Outstanding results in professional branding."
  },
  {
    name: "Amazon",
    logo: "https://datacentrereview.com/wp-content/uploads/2021/02/Amazon.png",
    testimonial: "Exceptional training and support throughout."
  }
];

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowScrollTop(window.scrollY > 500);
      
      const sections = ['home', 'about', 'client', 'courses', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:4000/sendMail', formData);
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', mobile: '', message: '' });
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'client', label: 'Clients' },
    { id: 'courses', label: 'Courses' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-blue-900 cursor-pointer hover:text-blue-700 transition-colors"
              onClick={scrollToTop}
            >
              Linkedly
            </motion.span>
            
            <div className="hidden md:flex space-x-8">
              {navLinks.map(link => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`text-gray-700 hover:text-blue-900 px-3 py-2 transition-colors relative ${
                    activeSection === link.id ? 'text-blue-900 font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-900"
                      initial={false}
                    />
                  )}
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-900 transition-colors"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t overflow-hidden"
            >
              {navLinks.map(link => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  className={`block px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                    activeSection === link.id ? 'text-blue-900 bg-gray-50' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  whileHover={{ x: 10 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20">
        <div className="relative h-80 md:h-screen flex items-center justify-center">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src="https://linkedinriches.com/wp-content/uploads/2015/12/LI-People-1.jpg" 
            alt="Professionals networking" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-4xl mx-auto text-center px-4"
            >
              <h1 className="text-2xl md:text-6xl font-bold text-white mb-6">
                Elevate Your Professional Presence
              </h1>
              <p className="hidden md:block md:text-2xl text-gray-200 mb-8">
                Master LinkedIn strategies that drive real results
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-900 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-800 transition-all"
              >
                Start Learning
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <FiInfo className="w-12 h-12 text-blue-900" />
              <h2 className="text-4xl font-bold">About Linkedly</h2>
              <p className="text-gray-600 text-lg">
                We empower professionals to maximize their LinkedIn potential through
                data-driven strategies and authentic engagement.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-xl mb-2">5+ Years</h3>
                  <p className="text-gray-600">Industry Experience</p>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                >
                  <h3 className="font-bold text-xl mb-2">10k+</h3>
                  <p className="text-gray-600">Professionals Trained</p>
                </motion.div>
              </div>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="About us"
              className="rounded-xl shadow-xl hover:shadow-2xl transition-shadow"
            />
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="client" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Trusted by Industry Leaders
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              Join thousands of professionals who've transformed their careers
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl p-6 shadow-lg transition-all cursor-pointer"
              >
                <img 
                  src={client.logo} 
                  alt={client.name} 
                  className="h-20 mb-6 mx-auto object-contain"
                />
                <p className="text-gray-600 mb-4 text-center italic">"{client.testimonial}"</p>
                <p className="text-center font-semibold">{client.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-4"
            >
              Our Premium Courses
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600"
            >
              Expert-led training to elevate your professional presence
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all"
              >
                <div className="h-full flex flex-col">
                  <div className="mb-4">
                    <FiBook className="w-12 h-12 text-blue-900 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                  </div>
                  <div className="space-y-3 mb-6 flex-grow">
                    {course.features.map((feature, i) => (
                      <motion.div 
                        key={i} 
                        className="flex items-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <FiStar className="w-5 h-5 text-blue-900 mr-2" />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">{course.duration}</span>
                      <span className="text-2xl font-bold text-blue-900">{course.price}</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-800 transition-all"
                    >
                      Enroll Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 md:p-12 lg:flex lg:gap-12"
          >
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <h2 className="text-4xl font-bold mb-8">Connect With Us</h2>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ y: -5 }} 
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <FiMail className="w-6 h-6 text-blue-900 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Email</h4>
                      <p className="text-gray-600">contact@linkedly.com</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }} 
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <FiPhone className="w-6 h-6 text-blue-900 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">Phone</h4>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ y: -5 }} 
                  className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <FiLinkedin className="w-6 h-6 text-blue-900 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg">LinkedIn</h4>
                      <p className="text-gray-600">Connect with us</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="lg:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <label className="block text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 outline-none border rounded-lg transition-shadow hover:shadow-md"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full p-3 border rounded-lg outline-none transition-shadow hover:shadow-md"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="text"
                  className="w-full p-3 border outline-none rounded-lg  transition-shadow hover:shadow-md"
                  value={formData.mobile}
                  onChange={e => setFormData({...formData, mobile: e.target.value})}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-gray-700 mb-2">Message *</label>
                <textarea
                  required
                  className="w-full p-3 border rounded-lg h-32 outline-none transition-shadow hover:shadow-md"
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full bg-blue-900 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-all"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </motion.button>

              {status && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-3 rounded-lg ${
                    status.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}
                >
                  {status}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-900 text-white p-3 rounded-full shadow-lg hover:bg-blue-800 transition-colors z-50"
          >
            <FiArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;