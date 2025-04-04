import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRCodeGenerator = () => {
  const [input, setInput] = useState('');
  const [qrCode, setQrCode] = useState('');

  const generateQRCode = async () => {
    try {
      const qr = await QRCode.toDataURL(input);
      setQrCode(qr);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
        placeholder="Enter text or URL"
      />
      <button onClick={generateQRCode}>Generate QR Code</button>
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
};

export default QRCodeGenerator;
