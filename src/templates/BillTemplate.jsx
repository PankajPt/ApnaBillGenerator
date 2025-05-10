import React from 'react';

const BillTemplate = (name, date, cardNumber) => {
  // Generate random 10-digit transaction ID

const generateDigitId = (length) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

const generateMidName = (name) => {
    const formattedString = name
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("")
        .slice(0, 6);
    return formattedString
}

const generateRRN = generateDigitId(5)

  // Data rows configuration
  const rows = [
    { label: "Txn ID", value: date + generateDigitId(15) + generateDigitId(12) },
    { label: "Order ID", value: date + generateDigitId(7) + generateRRN +  generateTenDigitId(8) },
    { label: "Card No", value: "************" + cardNumber },
    { label: "Bank MID", value: "ZC" + generateDigitId(4) },
    { label: "Bank TID", value: generateDigitId(8) },
    { label: "AID", value: "A0000000031010" },
    { label: "Acquiring Bank", value: "HDFC Bank Limited" },
    { label: "Card Type", value: "VISA" },
    { label: "App Label", value: "Visa Debit" },
    { label: "Transaction Type", value: "SALE" },
    { label: "Serial No", value: generateDigitId(10) },
    { label: "MID", value: generateMidName(name) + generateDigitId(14) },
    { label: "TID", value: generateDigitId(8) },
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

export default BillTemplate;