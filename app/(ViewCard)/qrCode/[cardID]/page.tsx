import { notFound } from "next/navigation";
import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { BsQrCodeScan } from "react-icons/bs";

interface Props {
  params: Promise<{ cardID: string }>; // Remove Promise, params are passed as an object
}

const QRPage = async ({ params }: Props) => {
  try {
    const { cardID } = await params;

    if (!cardID) {
      return notFound(); // Handle missing cardID
    }

    // Get domain URL from environment variables
    const DOMAIN_URL = process.env.DOMAIN_URL || "http://localhost:3000";
    const qrCodeUrl = `${DOMAIN_URL}/card/${cardID}`;

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-gradient-to-br from-blue-500 to-indigo-700 p-6">
        {/* QR Code Icon with Animation */}
        <div className="animate-bounce">
          <BsQrCodeScan size={60} className="text-white" />
        </div>

        {/* Title */}
        <h1 className="font-bold text-3xl text-white mt-4 drop-shadow-md">
          Scan QR Code
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-center mt-2 text-lg max-w-md drop-shadow-md">
          Scan the QR code below to check the user&apos;s profile card.
        </p>

        {/* QR Code Card */}
        <div className="bg-white p-6 mt-6 rounded-xl shadow-xl flex flex-col items-center">
          <QRCodeSVG value={qrCodeUrl} size={180} />
          <p className="text-gray-600 mt-2 font-semibold text-sm">
            {qrCodeUrl}
          </p>
        </div>

        {/* Footer */}
        <p className="text-gray-300 text-sm mt-6">
          Powered by <span className="font-bold">YourApp</span>
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
};

export default QRPage;
