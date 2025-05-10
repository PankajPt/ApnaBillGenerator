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
    { label: "Density", value: "754.6kg/m3" },
    { label: "Preset", value: "NON PRESET" },
    { label: "Rate", value: "" },
    { label: "Sale", value: "" },
    { label: "Volume", value: "" }
  ];

    // Calculate maximum label length
  const maxLabelLength = Math.max(...rows.map(row => row.label.length));

  // Pad labels so ':' aligns
  const paddedRows = rows.map(row => {
    const paddedLabel = row.label.padEnd(maxLabelLength, ' ');
    return {
      ...row,
      paddedLabel
    };
  });

  return (
    <div 
      className="relative bg-white-900 p-0 overflow-hidden"
      style={{
        width: '57mm',
        height: '155mm',
        fontFamily: 'Consolas, monospace',
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
          <div className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono" 
          style={{ fontFamily: 'Consolas, monospace' }}>
            <div>OM SAI PETROLEUM</div>
            <div>HPCL DEALER</div>
            <div>PLOT NO.14, SECTOR 21,</div>
            <div>CBD BELAPUR</div>
          </div>

        {/* Right side stripbar logo */}
        <div className="absolute right-[3mm] top-0 bottom-0 w-4 flex justify-center">
          <img 
            src="/hdfc.png" 
            alt="Stripbar Logo"
            className="h-full object-contain"
          />
        </div>

        {/* Content with 10mm left padding */}
        <div
          className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {rows.map((row, index) => {
            const maxLabelLength = Math.max(...rows.map(r => r.label.length));
            const paddedLabel = row.label.padEnd(maxLabelLength, ' ');
            return (
              <div key={index}>{`${paddedLabel}: ${row.value}`}</div>
            );
          })}
        </div>
        <div className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono" 
          style={{ fontFamily: 'Consolas, monospace' }}>
            <div>THANK YOU!! VISIT AGAIN!!</div>
          </div>
      </div>
    </div>
  );
};

export default ReceiptTemplate;