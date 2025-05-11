import { useState, useRef } from 'react';
import ReceiptTemplate from '../templates/ReceiptTemplate.jsx'
import TransactionTemplate from '../templates/TransactionTemplate.jsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const FuelBillPage = () => {
  const [formData, setFormData] = useState({
    stationName: '',
    address: '',
    dateTime: Date.now(),
    density: '754.6kg/m3',
    FPID: '3',
    NOZZID: '3',
    clientBank: 'ICICI Bank',
    fuel: 'PETROL',
    vehicleNum: '',
    mobNum: '',
    rate: '103.65',
    sale: '4500',
    station: 'hp',
    cardNumber: ''
  });

  const [includeTransaction, setIncludeTransaction] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const previewRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber' && !/^\d{0,4}$/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDownload = async (type) => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      backgroundColor: null
    });

    if (type === 'png') {
      const link = document.createElement('a');
      link.download = `fuel-bill-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      const pdf = new jsPDF('p', 'mm', [includeTransaction ? 120 : 60, 155]);
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 0, 0, includeTransaction ? 120 : 60, 155);
      pdf.save(`fuel-bill-${Date.now()}.pdf`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Fuel Bill Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Station Name</label>
            <input
              type="text"
              name="stationName"
              value={formData.stationName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Date & Time</label>
            <input
              type="datetime-local"
              value={new Date(formData.dateTime).toISOString().slice(0, 16)}
              onChange={(e) => {
                const date = new Date(e.target.value);
                setFormData(prev => ({ ...prev, dateTime: date.getTime() }));
              }}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Fuel Station Brand</label>
            <select
              name="station"
              value={formData.station}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="hp">Hindustan Petroleum</option>
              <option value="bp">Bharat Petroleum</option>
              <option value="io">Indian Oil</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">FP.ID</label>
            <input
              type="text"
              name="FPID"
              value={formData.FPID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Nozzle ID</label>
            <input
              type="text"
              name="NOZZID"
              value={formData.NOZZID}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Fuel Type</label>
            <select
              name="fuel"
              value={formData.fuel}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="PETROL">Petrol</option>
              <option value="DIESEL">Diesel</option>
              <option value="CNG">CNG</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Density</label>
            <input
              type="text"
              name="density"
              value={formData.density}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Client Bank</label>
            <input
              type="text"
              name="clientBank"
              value={formData.clientBank}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Rate (₹/L)</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Sale Amount (₹)</label>
            <input
              type="number"
              name="sale"
              value={formData.sale}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Card Number (Last 4 digits)</label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              maxLength={4}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeTransaction}
              onChange={(e) => setIncludeTransaction(e.target.checked)}
            />
            Include Transaction Receipt
          </label>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl font-bold">Live Preview</h2>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={grayscale}
                onChange={(e) => setGrayscale(e.target.checked)}
              />
              Scan Effect
            </label>
          </div>
        </div>

        <div 
          ref={previewRef}
          className={`flex gap-4 ${grayscale ? 'grayscale' : ''}`}
        >
          <ReceiptTemplate
            name={formData.stationName}
            address={formData.address}
            dateTime={formData.dateTime}
            vehicleNum={formData.vehicleNum}
            mobNum={formData.mobNum}
            FPID={formData.FPID}
            NOZZID={formData.NOZZID}
            fuel={formData.fuel}
            density={formData.density}
            rate={formData.rate}
            sale={formData.sale}
            logo={formData.station}
          />
          
          {includeTransaction && (
            <TransactionTemplate
              name={formData.stationName}
              dateTime={formData.dateTime}
              cardNumber={formData.cardNumber}
              amount={(formData.sale / 1).toLocaleString('en-IN')}
              clientBank={formData.clientBank}
              address={formData.address}
            />
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => handleDownload('png')}
            className="px-4 py-2 bg-gray-800 text-white rounded"
          >
            Download PNG
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuelBillPage;