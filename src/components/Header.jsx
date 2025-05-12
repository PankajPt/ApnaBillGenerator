// Header.jsx
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 bg-gray-900 text-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-indigo-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold">Apna Bill Generator</span>
            </div>
          </Link>
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            </Link>
            <Link to="/contact">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
            </Link>
          </div>

          {/* User Profile */}
          {/* <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium">John Doe</p>
              <div className="flex items-center">
                <span>Account</span>
                <ChevronDownIcon className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div> */}
        </div>
      </nav>
    </header>
  )
}