"use client";
import React from "react";
import { Button } from "../ui/button";
import { BsQrCodeScan } from "react-icons/bs";
import { useInformationState } from "@/state_management/information.state";

const QRButton = () => {
  const cardId = useInformationState((state) => state.cardId);

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
