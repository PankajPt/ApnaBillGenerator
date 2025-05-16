import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaGasPump, FaHotel, FaShieldAlt, FaPlus,
  FaUserTie, FaHome, FaWifi, FaTools, FaBolt, FaPhoneAlt, FaEye 
} from 'react-icons/fa';
import { db, doc, getDoc, setDoc, updateDoc, increment } from '../services/firebaseConfig.js';

const Home = () => {
  const [activeTab, setActiveTab] = useState('fuel');
  const [visitCount, setVisitCount] = useState(0);
  const [pulse, setPulse] = useState(false);
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

  useEffect(() => {
    const incrementVisit = async () => {
      try {
        const counterRef = doc(db, 'counters', 'homeVisit');
        const counterSnap = await getDoc(counterRef);

        if (counterSnap.exists()) {
          await updateDoc(counterRef, {
            count: increment(1)
          });
        } else {
          await setDoc(counterRef, { count: 1 });
        }

        const updatedSnap = await getDoc(counterRef);
        setVisitCount(updatedSnap.data().count);
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      } catch (error) {
        console.error("Error updating visit count:", error);
      }
    };

    incrementVisit();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 relative">
      {/* Visit Counter */}
      {/* Modern Visit Counter */}
      <div className={`absolute top-4 right-4 flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md bg-opacity-90 text-white px-4 py-2 rounded-full shadow-lg transition-all duration-300 ${
        pulse ? 'animate-pulse' : ''
      }`}>
        <FaEye className="text-sm opacity-90" />
        <span className="text-sm font-medium">
          <span className="text-xs opacity-90 mr-1">Visits</span>
          <span className="font-bold">{visitCount}</span>
        </span>
      </div>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Bill Management System</h1>

        {/* Tabs */}
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
        </div>
      </div>
    </div>
  );
};

export default Home;