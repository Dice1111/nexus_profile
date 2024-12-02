"use client";

import React from "react";

const Client = () => {
  if (typeof window !== "undefined") {
    // This code is running on the client
    console.log("Test Client Component is running Client-side rendering");
  } else {
    // This code is running on the server
    console.log("Test Client Component is running Server-side rendering");
  }
  return <div>Client</div>;
};

export default Client;
