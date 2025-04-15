"use client";
import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QrCodeButtonProps {
  qrCodeUrl: string;
}

const QrCode: React.FC<QrCodeButtonProps> = ({ qrCodeUrl }) => {
  const handleClick = () => {
    window.open(qrCodeUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="transition-all duration-300 ease-in-out hover:ring-4 hover:ring-red-400 hover:rounded-xl hover:shadow-lg focus:outline-hidden"
    >
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center transition-all duration-300">
        <QRCodeSVG value={qrCodeUrl} size={180} />
      </div>
    </button>
  );
};

export default QrCode;
