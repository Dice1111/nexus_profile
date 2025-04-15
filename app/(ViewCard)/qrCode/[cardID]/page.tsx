import QrCode from "@/components/QRCodeButton/QrCode";
import ShareButton from "@/components/QRCodeButton/ShareButton";
import { baseUrl } from "@/util/utils";
import { notFound } from "next/navigation";
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

    const qrCodeUrl = `${baseUrl}/card/${cardID}`;

    return (
      <div className="flex flex-col justify-center items-center h-screen w-full bg-primary p-6">
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
          Scan or Click the QR code below to check the user&apos;s profile card.
        </p>

        {/* QR Code Card */}
        <div className="mt-6">
          <QrCode qrCodeUrl={qrCodeUrl} />
        </div>

        <div className="mt-6">
          <ShareButton url={qrCodeUrl} />
        </div>

        {/* Footer */}
        <p className="text-gray-300 text-sm mt-6">
          Powered by <span className="font-bold">Nexus Nova</span>
        </p>
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
};

export default QRPage;
