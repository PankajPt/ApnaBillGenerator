import { AlertTriangle, ShieldAlert } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">About Bill Management System</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed">
              Streamline business operations through automated bill generation and 
              financial management. Our system provides professional-grade templates 
              with real-time previews and seamless integration with modern workflows.
            </p>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Key Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Multi-format bill templates</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Real-time preview system</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>PDF/PNG export capabilities</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">✓</span>
                <span>Cloud-ready architecture</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Technology Stack</h2>
            <div className="flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">React 18</span>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">Tailwind CSS</span>
            </div>
          </div>

          <div className="bg-red-800 p-6 rounded-lg shadow-lg mt-6">
            <div className="flex items-center mb-4">
              <ShieldAlert className="w-6 h-6 text-red-200 mr-2" />
              <h2 className="text-xl font-semibold text-red-200">Responsible Use Disclaimer</h2>
            </div>
            <p className="text-red-100 leading-relaxed flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 mt-1 text-yellow-200 flex-shrink-0" />
              This Bill Management System is intended solely for legitimate and lawful business operations. 
              Any misuse, including the generation of fraudulent or misleading invoices, is strictly prohibited and 
              may lead to legal consequences. Users are responsible for ensuring all generated content complies 
              with applicable laws and ethical standards. By using this tool, you agree to use it responsibly 
              and at your own risk.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};