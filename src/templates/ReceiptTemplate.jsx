import React, { useState, useEffect } from 'react';

const ReceiptTemplate = ({
  name = "ABC Petroleum HPCL Dealer",
  address = "PLOT NO.14, SECTOR 21, CBD BELAPUR",
  dateTime = Date.now(),
  vehicleNum = "NotEntered",
  mobNum = "NotEntered",
  FPID = "3",
  NOZZID = "3",
  fuel = "PETROL",
  density = "754.6kg/m3",
  rate = "103.65",
  sale = "4500",
  logo = "hp"
}) => {
  const [billNo, setBillNo] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const selectLogo = {
    hp: '/hp.png',
    bp: '/bp.png',
    io: '/io.png'
  };

  useEffect(() => {
    const generateDigitId = (length) => {
      const min = Math.pow(10, length - 1);
      const max = Math.pow(10, length) - 1;
      return Math.floor(min + Math.random() * (max - min + 1)).toString();
    };

    const date = new Date(dateTime);
    const getMonth = date.toLocaleString('default', { month: 'long' }).slice(0,3);
    const bill = getMonth + generateDigitId(6).padStart(7, "-") + "-ORGNL";
    const transId = generateDigitId(10).padStart(16, "0");

    setBillNo(bill);
    setTransactionId(transId);
  }, [dateTime]);

  const date = new Date(dateTime);
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

  const rows = [
    { label: "Bill No", value: billNo },
    { label: "Trns.ID", value: transactionId },
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

  const maxLabelLength = Math.max(...rows.map(row => row.label.length));
  const paddedRows = rows.map(row => ({
    ...row,
    paddedLabel: row.label.padEnd(maxLabelLength, ' ')
  }));

  return (
    <div className="relative bg-white-900 p-0 overflow-hidden"
      style={{
        width: '60mm',
        height: '165mm',
        fontFamily: 'Consolas, monospace',
      }}>
      <div className="relative h-full p-0 flex flex-col">
        <div className="pt-[5mm]"></div>

        <div className="flex justify-center">
          <img
            src={selectLogo[logo]}
            alt="Company Logo"
            className="h-15 object-contain"
            style={{ maxWidth: '45%' }}
          />
        </div>

        <div className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono">
          <div>{name}</div>
          <div>{address.replace(/,/g, ', ').replace(/\s+/g, ' ')}</div>
        </div>

        <div className="absolute right-[3mm] top-0 bottom-0 w-4 flex justify-center">
          <img
            src="/hdfc.png"
            alt="Stripbar Logo"
            className="h-full object-contain"
          />
        </div>

        <div
          className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {paddedRows.map((row, index) => (
            <div key={index}>{`${row.paddedLabel}: ${row.value}`}</div>
          ))}
        </div>

        <div className="relative z-10 px-[5mm] pt-[5mm] text-xs font-mono">
          <div>THANK YOU!! VISIT AGAIN!!</div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptTemplate;
