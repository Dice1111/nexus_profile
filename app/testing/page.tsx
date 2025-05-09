import React from "react";

const Page = () => {
  return (
    <>
      {/* Fixed full-width green navbar */}
      <div className="fixed top-0 left-0 w-full z-10 bg-green-400 h-44">
        <div className="container mx-auto px-0">Sticky Header</div>
      </div>

      {/* Add top padding equal to the header height */}
      <div className="container mx-auto px-0 pt-44">
        <div className="bg-red-500 h-[2000px]">Appleeeeeeeeeeeeeeeeeeeeee</div>
      </div>
    </>
  );
};

export default Page;
