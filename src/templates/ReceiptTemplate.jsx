import React from 'react';

const ReceiptTemplate = () => {
  // Generate random 10-digit transaction ID
  const generateTransactionId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const transactionId = generateTransactionId();

  // Data rows configuration
  const rows = [
    { label: "Bill No", value: "May-326540-ORGNL" },
    { label: "Trns.ID", value: transactionId },
    { label: "Atnd.ID", value: "" },
    { label: "Receipt", value: "Physical Receipt" },
    { label: "Vehi.No", value: "" },
    { label: "Mob.No", value: "" },
    { label: "Date", value: "" },
    { label: "Time", value: "" },
    { label: "FP. ID", value: "" },
    { label: "Nozl No", value: "" },
    { label: "Fuel", value: "" },
    { label: "Density", value: "" },
    { label: "Preset", value: "NON PRESET" },
    { label: "Rate", value: "" },
    { label: "Sale", value: "" },
    { label: "Volume", value: "" }
  ];

  return (
    <div 
      className="relative bg-gray-300 p-0 overflow-hidden"
      style={{
        width: '57mm',
        height: '155mm',
        fontFamily: 'Consolas, monospace',
        backgroundColor: '#e5e7eb',
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.05) 90%),
          radial-gradient(circle at 90% 80%, rgba(0,0,0,0.01) 0%, rgba(0,0,0,0.05) 90%)
        `,
      }}
    >
      {/* Main content container */}
      <div className="relative h-full p-0 flex flex-col">
        {/* Top padding */}
        <div className="pt-[5mm]"></div>

        {/* Logo section - centered */}
        <div className="flex justify-center">
          <img 
            src="/hp.png" 
            alt="Company Logo"
            className="h-15 object-contain" 
            style={{ maxWidth: '60%' }}
          />
        </div>

        {/* 5mm padding below logo */}
        <div className="pt-[5mm]"></div>

        {/* Right side stripbar logo */}
        <div className="absolute right-[5mm] top-0 bottom-0 w-4 flex justify-center">
          <img 
            src="/strip.png" 
            alt="Stripbar Logo"
            className="h-full object-contain"
          />
        </div>

        {/* Content with 10mm left padding */}
        <div className="pl-[5mm] pr-[9mm] flex-grow text-xs">
          <div className="space-y-1">
            {rows.map((row, index) => (
              <div key={index} className="flex">
                <div className="flex-shrink-0">
                  <span className="inline-block w-20 text-left">{row.label}</span>
                  <span className="inline-block text-left">:</span>
                </div>
                <div className="flex-grow">
                  <span>{row.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTemplate;