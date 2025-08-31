"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-b-primary">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="relative">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={64}
              objectFit="contain"
              className="rounded"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600 transition">
              About
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-indigo-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="#home" className="text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="#about" className="text-gray-700 hover:text-indigo-600">
              About
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
