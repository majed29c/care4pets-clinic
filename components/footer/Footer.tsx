import { FaInstagram, FaTwitter, FaFacebook, FaPhone, FaMapMarker, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-purple-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              PetCare Clinic
            </h3>
            <p className="text-gray-300 text-sm">
              Providing compassionate care for your beloved pets since 2010. 
              Trusted by thousands of pet owners in the community.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                <FaInstagram className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                <FaTwitter className="text-2xl" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition">
                <FaFacebook className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="about" className="text-gray-300 hover:text-blue-400 transition">About Us</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition">Services</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition">Our Team</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition">Emergency Care</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-blue-400 transition">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaMapMarker className="text-blue-400" />
                <span className="text-gray-300">123 Pet Care Street<br/>New York, NY 10001</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-blue-400" />
                <span className="text-gray-300">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-blue-400" />
                <span className="text-gray-300">contact@petcare.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for pet care tips and special offers!
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="p-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button 
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 rounded-lg hover:opacity-90 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 PetCare Clinic. All rights reserved. 
            <a href="#" className="hover:text-blue-400 ml-2">Terms of Service</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;