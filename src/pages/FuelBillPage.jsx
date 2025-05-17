import { useState, useRef } from 'react';
import ReceiptTemplate from '../templates/ReceiptTemplate.jsx';
import TransactionTemplate from '../templates/TransactionTemplate.jsx';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const FuelBillPage = () => {
  // Form state management
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
    cardNumber: '',
    strip: ''
  });

  const [includeTransaction, setIncludeTransaction] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const previewRef = useRef(null);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber' && !/^\d{0,4}$/.test(value)) return;
    if (name === 'mobNum' && !/^\d{0,10}$/.test(value)) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const formatForDateTimeInput = (ms) => {
    const date = new Date(ms);
    const pad = (n) => String(n).padStart(2, '0');
  
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const HH = pad(date.getHours());
    const mm = pad(date.getMinutes());
  
    return `${yyyy}-${MM}-${dd}T${HH}:${mm}`;
  };

  const handleDownload = async (type) => {
    const element = previewRef.current;
    const scale = 3;
    const mmToPx = 3.78;

    try {
      const canvas = await html2canvas(element, {
        scale,
        useCORS: true,
        backgroundColor: null,
        removeContainer: true,
      });

      // Apply grayscale if enabled
      if (grayscale) {
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
          const gray = data[i] * 0.3 + data[i + 1] * 0.59 + data[i + 2] * 0.11;
          data[i] = data[i + 1] = data[i + 2] = gray;
        }
        ctx.putImageData(imageData, 0, 0);
      }

      const imgData = canvas.toDataURL('image/jpeg', 1.0);

      if (type === 'png') {
        const link = document.createElement('a');
        link.download = `fuel-bill-${Date.now()}.jpg`;
        link.href = imgData;
        link.click();
      } else {
        // PDF generation
        const a4Width = 210; // A4 width in mm
        const a4Height = 297; // A4 height in mm
        const receiptWidth = includeTransaction ? 135 : 60;
        const receiptHeight = 165;

        // Center the image on A4
        const offsetX = (a4Width - receiptWidth) / 2;
        const offsetY = (a4Height - receiptHeight) / 2;

        const pdf = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: 'a4',
        });

        pdf.addImage(
          imgData,
          'JPEG',
          offsetX,
          offsetY,
          receiptWidth,
          receiptHeight,
          undefined,
          'FAST'
        );

        pdf.save(`fuel-bill-${formatForDateTimeInput(formData.dateTime)}.pdf`);
      }
    } catch (error) {
      console.error('Error generating document:', error);
      alert('An error occurred while generating the document. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Fuel Bill Details</h2>
          <p className="text-sm text-gray-500">Fill in the details to generate your fuel receipt</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Station Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Station Information</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Station Name</label>
              <input
                type="text"
                name="stationName"
                value={formData.stationName}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter station name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="Enter station address"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Date & Time</label>
              <input
                type="datetime-local"
                value={formatForDateTimeInput(formData.dateTime)}
                onChange={(e) => {
                  const date = new Date(e.target.value);
                  setFormData(prev => ({ ...prev, dateTime: date.getTime() }));
                }}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Station Brand</label>
              <select
                name="station"
                value={formData.station}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="hp">Hindustan Petroleum</option>
                <option value="bp">Bharat Petroleum</option>
                <option value="io">Indian Oil</option>
              </select>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Transaction Details</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Fuel Type</label>
              <select
                name="fuel"
                value={formData.fuel}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="CNG">CNG</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Rate (₹/L)</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                step="0.01"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Sale Amount (₹)</label>
              <input
                type="number"
                name="sale"
                value={formData.sale}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Client Bank</label>
              <input
                type="text"
                name="clientBank"
                value={formData.clientBank}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Vehicle & Payment */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Vehicle Information</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Vehicle Number</label>
              <input
                type="text"
                name="vehicleNum"
                value={formData.vehicleNum}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                placeholder="e.g. MH01AB1234"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Mobile Number</label>
              <input
                type="tel"
                name="mobNum"
                value={formData.mobNum}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                pattern="[0-9]{10}"
                placeholder="10-digit mobile number"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">Additional Details</h3>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">FP.ID</label>
              <input
                type="text"
                name="FPID"
                value={formData.FPID}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Nozzle ID</label>
              <input
                type="text"
                name="NOZZID"
                value={formData.NOZZID}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Density</label>
              <input
                type="text"
                name="density"
                value={formData.density}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Card Number (Last 4 digits)</label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                maxLength={4}
                required
                placeholder="Last 4 digits"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">Vertical Logo Strip</label>
              <select
                name="strip"
                value={formData.strip}
                onChange={handleInputChange}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">None</option>
                <option value="HDFC">HDFC</option>
                <option value="Axis">AXIS</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center">
            <input
              id="include-transaction"
              type="checkbox"
              checked={includeTransaction}
              onChange={(e) => setIncludeTransaction(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="include-transaction" className="ml-2 text-sm font-medium text-gray-700">
              Include Transaction Receipt
            </label>
          </div>
        </div>
      </div>

      {/* Preview Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Live Preview</h2>
            <p className="text-sm text-gray-500">Preview your receipt before downloading</p>
          </div>
          <div className="flex items-center">
            <input
              id="grayscale-toggle"
              type="checkbox"
              checked={grayscale}
              onChange={(e) => setGrayscale(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="grayscale-toggle" className="ml-2 text-sm font-medium text-gray-700">
              Scan Effect
            </label>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <div 
            ref={previewRef}
            className={`flex ${grayscale ? 'grayscale' : ''} shadow-md`}
            style={{
              width: includeTransaction ? '135mm' : '60mm',
              height: '165mm',
              gap: '12mm',
              padding: '0mm',
              backgroundColor: '#fff',
            }}
          >
            <div style={{
              width: includeTransaction ? 'calc(50% - 5.5mm)' : '100%',
              paddingRight: includeTransaction ? '10mm' : 0,
              boxSizing: 'border-box',
            }}>
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
                strip={formData.strip}
              />
            </div>

            {includeTransaction && (
              <div style={{
                width: 'calc(50% - 5.5mm)',
                paddingLeft: '2mm',
                boxSizing: 'border-box',
              }}>
                <TransactionTemplate
                  name={formData.stationName}
                  dateTime={formData.dateTime}
                  cardNumber={formData.cardNumber}
                  amount={(formData.sale / 1).toLocaleString('en-IN')}
                  clientBank={formData.clientBank}
                  address={formData.address}
                  strip={formData.strip}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleDownload('png')}
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download PNG
          </button>
          <button
            onClick={() => handleDownload('pdf')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default FuelBillPage;