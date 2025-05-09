"use client";
import { NavBarProps } from "@/lib/navbar/type";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

export default function NavBar<T>({
  data,
  children,
  wrapperClassName,
}: NavBarProps<T>) {
  const [currentPanel, setCurrentPanel] = useState<T>(data[0].panel);

  const renderContent = Array.isArray(children)
    ? children.find(
        (child) =>
          React.isValidElement(child) && child.props.id === currentPanel
      )
    : null;

  return (
    <>
      <nav
        className={cn(
          "py-4 sticky bg-primary z-1",
          wrapperClassName ? wrapperClassName : "top-12"
        )}
      >
        <div className="container mx-auto flex gap-4 ">
          {" "}
          {data.map((item) => (
            <button
              key={String(item.panel)} // Ensure uniqueness by converting the panel to a string
              onClick={() => setCurrentPanel(item.panel)} // Update the selected panel
              className={`transition ${
                currentPanel === item.panel
                  ? "border-b-2 font-bold"
                  : "font-thin hover:border-b-2 hover:border-gray-400"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Render the content based on the selected panel */}
      <section className="mt-4 container mx-auto">{renderContent}</section>
    </>
  );
}
