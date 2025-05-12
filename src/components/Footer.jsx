// Footer.jsx
import { EnvelopeIcon, PhoneIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <svg
                className="h-6 w-6 text-indigo-500"
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
              <span className="ml-2 text-xl font-bold text-white">Apna Bill Generator</span>
            </div>
            <p className="text-sm">
              Professional invoice generation and management system for modern businesses.
            </p>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                pankajpatil4949@gmail.com
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                +91 (987) 654-3210
              </li>
              <li className="flex items-center">
                <GlobeAltIcon className="h-5 w-5 mr-2" />
                https://github.com/PankajPt/
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} InvoicePro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}