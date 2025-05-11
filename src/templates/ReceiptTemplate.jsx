import React from 'react';

const ReceiptTemplate = ({
  name="ABC Petroleum HPCL Dealer", 
  address="PLOT NO.14, SECTOR 21, CBD BELAPUR", 
  dateTime=Date.now(), 
  vehicleNum="NotEntered", 
  mobNum="NotEntered", 
  FPID="3", 
  NOZZID="3", 
  fuel="PETROL", 
  density="754.6kg/m3", 
  rate="103.65", 
  sale="4500", 
  logo="hp"}) => {
  
  const generateDigitId = (length) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  };

  const selectLogo = {
    hp: '/hp.png',
    bp: '/bp.png',
    io: '/io.png'
  }

  const transactionId = generateDigitId(10);
  const date = new Date(dateTime);
  const getMonth = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = date.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).replace(",", "");
  const volume = (parseFloat(sale) / parseFloat(rate))?.toFixed(2);

  // Data rows configuration
  const rows = [
    { label: "Bill No", value: getMonth + generateDigitId(6).padStart(7, "-") + "-ORGNL" },
    { label: "Trns.ID", value: transactionId.padStart(16, 0) },
    { label: "Atnd.ID", value: "" },
    { label: "Receipt", value: "Physical Receipt" },
    { label: "Vehi.No", value: vehicleNum },
    { label: "Mob.No", value: mobNum },
    { label: "Date", value: formattedDate },
    { label: "Time", value: formattedTime },
    { label: "FP. ID", value: FPID },
    { label: "Nozl No", value: NOZZID },
    { label: "Fuel", value: fuel },
    { label: "Density", value: density },
    { label: "Preset", value: "NON PRESET" },
    { label: "Rate", value: `RS.${rate}` },
    { label: "Sale", value: `RS.${sale}` },
    { label: "Volume", value: `${volume}L` }
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
        width: '60mm',
        height: '165mm',
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
            src={selectLogo[logo]}
            alt="Company Logo"
            className="h-15 object-contain" 
            style={{ maxWidth: '45%' }}
          />
        </div>
          <div className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono" 
          style={{ fontFamily: 'Consolas, monospace' }}>
            <div>{name}</div>
            <div>{address.replace(/,/g, ', ').replace(/\s+/g, ' ')}</div> 
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