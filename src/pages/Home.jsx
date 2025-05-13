import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaGasPump, FaHotel, FaShieldAlt, FaPlus,
  FaUserTie, FaHome, FaWifi, FaTools, FaBolt, FaPhoneAlt 
} from 'react-icons/fa';
import FuelBillPage from './FuelBillPage';

const Home = () => {
  const [activeTab, setActiveTab] = useState('fuel');
  const navigate = useNavigate();
  const [tabs] = useState([
    { id: 'fuel', name: 'Fuel Bill', icon: <FaGasPump className="text-xl" /> },
    { id: 'hotel', name: 'Hotel Bill', icon: <FaHotel className="text-xl" /> },
    { id: 'insurance', name: 'Insurance', icon: <FaShieldAlt className="text-xl" /> },
    { id: 'driver', name: 'Driver Salary', icon: <FaUserTie className="text-xl" /> },
    { id: 'rent', name: 'Rent Receipts', icon: <FaHome className="text-xl" /> },
    { id: 'internet', name: 'Internet', icon: <FaWifi className="text-xl" /> },
    { id: 'maintenance', name: 'Maintenance', icon: <FaTools className="text-xl" /> },
    { id: 'electricity', name: 'Electricity', icon: <FaBolt className="text-xl" /> },
    { id: 'telephone', name: 'Telephone', icon: <FaPhoneAlt className="text-xl" /> },
    { id: 'add', name: 'Add New', icon: <FaPlus className="text-xl" /> },
  ]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Bill Management System</h1>
        
        {/* Tabs Navigation - Now with flex-wrap to prevent scrolling */}
        <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-700 border-l-4 border-blue-500'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            >
              <span className="text-blue-400">{tab.icon}</span>
              <span className="whitespace-nowrap text-sm md:text-base">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-gray-800 rounded-lg p-4 md:p-6 shadow-xl">
          {activeTab === 'fuel' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaGasPump className="text-blue-400" />
                <span>Fuel Bill Management</span>
              </h2>
              <p className="text-gray-300">
                Create and manage fuel-related expenses efficiently. Track vehicle mileage, fuel consumption, 
                and generate detailed reports with automated calculations.
              </p>
              <button 
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
              onClick={() => navigate('/fuel-bill')}>
                Create New Fuel Bill
              </button>
            </div>
          )}

          {activeTab === 'driver' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaUserTie className="text-blue-400" />
                <span>Driver Salary Processing</span>
              </h2>
              <p className="text-gray-300">
                Manage driver payroll, overtime calculations, and generate salary slips with tax deductions. 
                Track payment history and generate annual compensation reports.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

          {activeTab === 'rent' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaHome className="text-blue-400" />
                <span>Rent Receipt Management</span>
              </h2>
              <p className="text-gray-300">
                Generate professional rent receipts with automated calculations for security deposits, 
                maintenance charges, and tax-compliant documentation for accounting purposes.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

          {activeTab === 'internet' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaWifi className="text-blue-400" />
                <span>Internet Service Invoices</span>
              </h2>
              <p className="text-gray-300">
                Manage ISP subscriptions, track bandwidth usage, and generate detailed internet service invoices 
                with breakdowns of service taxes and additional charges.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

          {activeTab === 'maintenance' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaTools className="text-blue-400" />
                <span>Maintenance Bills</span>
              </h2>
              <p className="text-gray-300">
                Record and track property or vehicle maintenance expenses. Generate service reports with 
                itemized costs for repairs, parts replacement, and labor charges.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

          {activeTab === 'electricity' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaBolt className="text-blue-400" />
                <span>Electricity Bills</span>
              </h2>
              <p className="text-gray-300">
                Manage utility payments, track energy consumption patterns, and generate electricity bills 
                with detailed breakdowns of units consumed, fixed charges, and government taxes.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

          {activeTab === 'telephone' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaPhoneAlt className="text-blue-400" />
                <span>Telephone Bills</span>
              </h2>
              <p className="text-gray-300">
                Manage mobile and landline expenses, analyze call logs, and generate detailed telephone bills 
                with itemized call charges, data usage, and value-added services.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

           {activeTab === 'hotel' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center space-x-2">
                <FaHotel className="text-blue-400" />
                <span>Hotel Accommodation</span>
              </h2>
              <p className="text-gray-300">
                Manage hotel stays, room charges, and related expenses. Generate detailed accommodation 
                bills with tax breakdowns.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}

          {activeTab === 'insurance' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center space-x-2">
                <FaShieldAlt className="text-blue-400" />
                <span>Insurance Policies</span>
              </h2>
              <p className="text-gray-300">
                Manage insurance policies, premium payments, and generate insurance-related documents 
                with automated calculations.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Coming Soon...
              </button>
            </div>
          )}


          {activeTab === 'add' && (
            <div className="space-y-4">
              <h2 className="text-xl md:text-2xl font-semibold flex items-center space-x-2">
                <FaPlus className="text-blue-400" />
                <span>Add New Bill Type</span>
              </h2>
              <p className="text-gray-300">
                Create custom bill templates and categories to expand your billing capabilities. 
                Configure tax rules, approval workflows, and automated reminders for new bill types.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
                Feature Coming Soon...
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;