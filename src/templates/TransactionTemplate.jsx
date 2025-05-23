import React, { useEffect, useState } from 'react';

const generateDigitId = (length) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

const generateMidName = (name) => {
  return name
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join("")
    .slice(0, 6);
};

const TransactionTemplate = ({
  name = "ABC Petroleum HPCL Dealer",
  dateTime = Date.now(),
  cardNumber = "8747",
  amount = "4,500.41",
  clientBank = "ICICI Bank",
  address = "PLOT NO.14, SECTOR 21, CBD BELAPUR",
  strip = ""
}) => {
  const [transactionId, setTransactionId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [bankMid, setBankMid] = useState('');
  const [bankTid, setBankTid] = useState('');
  const [serialNum, setSerialNum] = useState('');
  const [MID, setMID] = useState('');
  const [TID, setTID] = useState('');
  const [rrn, setRRN] = useState('');
  const [authCode, setAuthCode] = useState('');
  
  const selectStrip = {
    HDFC: '/hdfc.png',
    Axis: '/axis.png'
  }

  const date = new Date(dateTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${year}${month}${day}`;

  useEffect(() => {
    const newRRN = generateDigitId(5);
    setRRN(newRRN);

    setTransactionId(formattedDate + generateDigitId(15) + generateDigitId(12));
    setOrderId(formattedDate + generateDigitId(7) + newRRN + generateDigitId(8));
    setBankMid("ZC" + generateDigitId(4));
    setBankTid(generateDigitId(8));
    setSerialNum(generateDigitId(10));
    setMID(generateMidName(name) + generateDigitId(14));
    setTID(generateDigitId(8));
    setAuthCode(generateDigitId(6));
  }, [dateTime]);

  const getFullDate = () => {
    const monthName = date.toLocaleString('default', { month: 'long' });
    const formattedTime = date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).replace(",", "");
    return `${day} ${monthName} ${year}, ${formattedTime}`;
  };

  const rows = [
    { label: "Txn ID", value: transactionId },
    { label: "Order ID", value: orderId },
    { label: "Card No", value: cardNumber.padStart(12, "*") },
    { label: "Bank MID", value: bankMid },
    { label: "Bank TID", value: bankTid },
    { label: "AID", value: "A0000000031010" },
    { label: "Acquiring Bank", value: "HDFC Bank Limited" },
    { label: "Card Type", value: "VISA" },
    { label: "App Label", value: "Visa Debit" },
    { label: "Transaction Type", value: "SALE" },
    { label: "Serial No", value: serialNum },
    { label: "MID", value: MID },
    { label: "TID", value: TID },
  ];

  return (
    <div
      className="relative bg-white-900 p-0 overflow-hidden"
      style={{
        width: '60mm',
        height: '165mm',
        fontFamily: 'Roboto, sans-serif',
        backgroundImage: `url('/bg.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      <div className="relative h-full p-0 flex flex-col">

        {/* Logo section */}
        <div className="flex justify-center pt-[5mm]">
          <img
            src="/paytm.png"
            alt="Company Logo"
            className="h-15 object-contain"
            style={{ maxWidth: '40%' }}
          />
        </div>

        <div className="flex justify-center pt-[1mm]">Payment Successful</div>
        <div className="flex justify-center font-bold">₹{amount}</div>
        <div className="flex justify-center text-xs font-bold">Paid at {name.toUpperCase()}</div>
        <div className="flex justify-center px-[7mm] text-xs">
          <div className="text-center" style={{
            maxWidth: '100%',
            wordBreak: 'break-word',
            display: 'inline-block'
          }}>
            {address.replace(/,/g, ', ').replace(/\s+/g, ' ')}
          </div>
        </div>
        <div className="flex justify-center text-xs">From {clientBank}</div>
        <div className="flex justify-center text-xs">━━━</div>
        <div className="flex justify-center text-xs font-bold">Auth Code : {authCode}</div>
        <div className="flex justify-center text-xs">{getFullDate()}</div>
        <div className="flex justify-center text-xs">RRN - {rrn.padStart(12, '0')}</div>
        <div className="relative z-10 px-[3mm] text-xs">━━━━━━━━━━━━━━━━━</div>
        <div className="relative z-10 px-[3mm] text-xs font-bold">Payment Details</div>

        {/* Stripbar logo */}
        { strip && selectStrip[strip] && (
          <div className="absolute right-[2mm] top-0 bottom-0 w-4 flex justify-center">
          <img
            src={selectStrip[strip]}
            alt="Stripbar Logo"
            className="h-full object-contain"
          />
        </div>
        )}
        

        {/* Payment Details */}
        <div className="relative z-10 px-[4mm] text-xs right-[1.5mm]">
          {rows.map((row, index) => (
            <div key={index} className="grid grid-cols-[max-content_1fr] gap-1 mb-1">
              <span className="whitespace-nowrap">{row.label}</span>
              <span className="text-right break-all hyphens-manual">
                {row.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-2 px-[5mm] text-[8px] leading-tight">
          <div className="text-center">
            I agree to pay as per card issuer agreement. Thank You. PIN verified OK. Signature not required
          </div>
          <div className="text-center font-bold mt-1">Customer Copy</div>
          <div className="text-center">PAYTMPOS Version 1.0.0.0</div>
        </div>
      </div>
    </div>
  );
};

export default TransactionTemplate;
