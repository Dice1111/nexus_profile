"use client";
import React from "react";
import { Button } from "../ui/button";
import { BsQrCodeScan } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface QRButtonProps {
  profileID: string;
}

const QRButton = ({ profileID }: QRButtonProps) => {
  const router = useRouter(); // Move useRouter inside the component

  const routeToQRCode = () => {
    router.push(`/qrCode/${profileID}`); // Use dynamic routing
  };

  return (
    <Button variant="outline" size="icon" type="button" onClick={routeToQRCode}>
      <BsQrCodeScan />
    </Button>
  );
};

export default QRButton;
