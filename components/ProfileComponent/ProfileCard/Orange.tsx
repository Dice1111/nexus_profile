"use client";

import React, { useEffect } from "react";

interface TestCompProps {
  foreground: string;
}
const Orange = ({ foreground }: TestCompProps) => {
  console.log("🟠 Orange rendered");

  useEffect(() => {
    console.log("🎯 Orange rendered or updated");
  });

  return <div style={{ backgroundColor: foreground }}>Orange</div>;
};

export default Orange;
