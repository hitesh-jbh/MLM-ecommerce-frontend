import React, { useState } from 'react';
import { Facebook, Instagram } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    saveInfo: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '', saveInfo: false });
  };

  return (
    <div className="min-h-screen bg-white px-6 md:px-12 lg:px-20 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Left Section - Form */}
          <div className="lg:col-span-2">
            <div className="mb-8 md:mb-12">
              <h1 className="text-2xl md:text-4xl lg:text-3xl text-black mb-4">
                We would love to hear from you.
              </h1>
              <p className="text-gray-500 text-base md:text-sm">
                If you've got great products your making or looking to work with us then drop us a line.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-5 border border-gray-200 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-5 border border-gray-200 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows="8"
                className="w-full px-4 md:px-6 py-3 md:py-4 bg-gray-5 border border-gray-200 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 transition resize-none"
              ></textarea>

              {/* Checkbox */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="saveInfo"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="w-5 h-5 mt-1 cursor-pointer accent-black"
                />
                <label htmlFor="saveInfo" className="text-gray-700 text-sm md:text-base cursor-pointer">
                  Save my name, email, and website in this browser for the next time I comment.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-black hover:bg-gray-900 text-white px-8 md:px-10 py-3 md:py-4 font-semibold rounded-md transition-colors duration-300"
              >
                Submit Now
              </button>
            </form>
          </div>

          {/* Right Section - Info */}
          <div className="space-y-10 md:space-y-14">
            
            {/* Information */}
            <div>
              <h2 className="text-lg md:text-xl text-black mb-6">
                Information
              </h2>
              <div className="space-y-3">
                <p className="text-gray-700 text-xs md:text-base font-medium">
                  +91 74360 04465
                </p>
                <p className="text-gray-700 text-sm md:text-base">
                  contact.gentlehaus@gmail.com
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h2 className="text-lg md:text-xl text-black mb-6">
                Social Media
              </h2>
              <div className="flex gap-4">
                <a href="#" className="text-black hover:text-gray-700 transition">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-black hover:text-gray-700 transition">
                  <Instagram size={24} />
                </a>
              </div>
            </div>

            {/* Customer Support */}
            <div>
              <h2 className="text-lg md:text-xl text-black mb-6">
                Customer Support & Store Updates
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 text-sm md:text-base">
                  For any assistance, chat with our support team.
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                  Exchanges are available daily from 10 AM to 6 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}