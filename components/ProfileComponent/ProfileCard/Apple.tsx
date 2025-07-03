import React from "react";
interface AppleProps {
  backgroundcolor: string;
}

const Apple = ({ backgroundcolor }: AppleProps) => {
  console.log("🍎 Apple rendered");
  return <div style={{ backgroundColor: backgroundcolor }}>Apple</div>;
};

export default Apple;
