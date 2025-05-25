"use client";

import React from "react";
import { Input } from "../ui/input";
import Form from "next/form";
import { SearchIcon } from "lucide-react";
import SearchBarLoadingSpinner from "../Loading/SearchBarLoadingSpinner";

const ContactSearchBar = () => {
  return (
    <Form
      className="flex flex-row items-center justify-between relative bg-amber-300 w-full md:max-w-lg"
      action={""}
    >
      <div className="relative w-full">
        <SearchIcon className="absolute text-muted-foreground left-3 top-1/2 h-4 w-4 -translate-y-1/2 " />
        <Input
          placeholder="Search Contact"
          className="h-14 bg-secondary text-primary px-10"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <SearchBarLoadingSpinner />
        </div>
      </div>
    </Form>
  );
};

export default ContactSearchBar;
