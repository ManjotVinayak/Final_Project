import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-bold text-blue-600 hover:text-blue-700 cursor-pointer transition duration-300">
          MyWebsite
        </h1>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <a href="#home" className="hover:text-blue-600 transition duration-300">Home</a>
          <a href="#about" className="hover:text-blue-600 transition duration-300">About</a>
          <a href="#contact" className="hover:text-blue-600 transition duration-300">Contact</a>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
            Login
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
