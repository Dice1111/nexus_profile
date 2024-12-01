import React from "react";

const ServerTest = () => {
  if (typeof window !== "undefined") {
    // This code is running on the client
    console.log("Test Server Component is running Client-side rendering");
  } else {
    // This code is running on the server
    console.log("Test Server Component is running Server-side rendering");
  }
  return <div>Server</div>;
};

export default ServerTest;
