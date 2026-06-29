import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bottom-0 left-0 w-full bg-gradient-to-r from-indigo-950 via-blue-900 to-purple-900 border-t border-white/10 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-2 shadow-lg">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5402/5402751.png"
                alt="BookHeaven"
                className="w-8 h-8"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
                BookHeaven
              </h2>

              <p className="text-xs text-gray-400">Read • Learn • Explore</p>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-5 text-xl">
            <a
              href="#"
              className="text-gray-400 hover:text-white hover:scale-125 transition duration-300"
            >
              <FaGithub />
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 hover:scale-125 transition duration-300"
            >
              <FaLinkedin />
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-pink-500 hover:scale-125 transition duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="border-t border-zinc-700 my-4"></div>

        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400 gap-2">
          <p>© {new Date().getFullYear()} BookHeaven. All Rights Reserved.</p>

          <p className="flex items-center gap-2">
            Made with
            <FaHeart className="text-red-500 animate-pulse" />
            by BookHeaven
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
