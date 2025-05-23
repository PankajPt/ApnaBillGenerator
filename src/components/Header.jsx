// Header.jsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="ml-2 text-xl font-bold">Apna Bill Generator</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-indigo-300 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-indigo-300 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-indigo-300 transition-colors">Contact</Link>
          </div>

          {/* Hamburger Menu Button - Visible on Small Screens */}
          <button onClick={() => setMenuOpen(true)} className="md:hidden focus:outline-none">
            <Bars3Icon className="h-7 w-7" />
          </button>
        </div>
      </nav>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Slide-In Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-lg font-semibold">Menu</span>
          <button onClick={() => setMenuOpen(false)} className="text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="flex flex-col p-4 space-y-4">
          <Link to="/" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/contact" className="hover:text-indigo-300" onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      </div>
    </header>
  );
}
