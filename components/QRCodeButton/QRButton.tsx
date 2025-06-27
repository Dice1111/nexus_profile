"use client";
import React from "react";
import { Button } from "../ui/button";
import { BsQrCodeScan } from "react-icons/bs";

interface QRButtonProps {
  cardId: string;
}

const QRButton = ({ cardId }: QRButtonProps) => {
  const routeToQRCode = () => {
    window.open(`/qrCode/${cardId}`, "_blank"); // Opens in a new tab
  };

  return (
    <Button variant="outline" size="icon" type="button" onClick={routeToQRCode}>
      <BsQrCodeScan />
    </Button>
  );
};

export default QRButton;
