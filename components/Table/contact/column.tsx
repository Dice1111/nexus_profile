"use client";

import { ArrowUpDown } from "lucide-react";
import { Contact, CONTACT_TAG_TYPE } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { LuDot } from "react-icons/lu"; // Import icon

const TagColorScheme: Record<CONTACT_TAG_TYPE, string> = {
  [CONTACT_TAG_TYPE.COLLEAGUE]: "bg-red-200 text-primary",
  [CONTACT_TAG_TYPE.FAMILY]: "bg-green-200 text-primary",
  [CONTACT_TAG_TYPE.FRIEND]: "bg-yellow-200 text-primary",
  [CONTACT_TAG_TYPE.CLIENT]: "bg-blue-200 text-primary",
  [CONTACT_TAG_TYPE.SUPPLIER]: "bg-orange-200 text-primary",
  [CONTACT_TAG_TYPE.EMPLOYEE]: "bg-indigo-200 text-primary",
  [CONTACT_TAG_TYPE.INVESTOR]: "bg-cyan-200 text-primary",
  [CONTACT_TAG_TYPE.VENDOR]: "bg-pink-200 text-primary",
  [CONTACT_TAG_TYPE.OTHER]: "bg-gray-200 text-primary",
};

export const columns: ColumnDef<Contact>[] = [
  {
    accessorKey: "connectedUsername",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex justify-start items-center hover:text-secondary-foreground font-semibold text-base"
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.original.connectedUsername;
      const image = row.original.connectedUserImage || undefined;
      const occupation = row.original.connectedUserOccupation;
      const company = row.original.connectedUserCompany;
      const tag = row.original.tag;
      const date = new Date(row.original.connectedDate).toLocaleDateString();

      // Determine the tag color based on the tag value
      const tagClass = TagColorScheme[tag];

      return (
        <div className="flex flex-col lg:flex-row lg:justify-between p-4 gap-4 lg:gap-6">
          {/* Left Section: Avatar and Contact Details */}
          <div className="flex items-center gap-4">
            {/* Avatar Section */}
            <div className="shrink-0">
              <Avatar className="w-14 h-14">
                <AvatarImage src={image} />
                <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                  {name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Contact Details */}
            <div className="flex flex-col justify-between">
              <p className="text-lg sm:text-base">{name}</p>

              {/* Occupation and Company: Responsive Layout */}
              <div className="flex items-center gap-2 text-sm sm:text-xs text-primary">
                {/* Occupation: Always Visible */}
                <p>{occupation}</p>

                {/* Icon and Company: Hidden on Extra-Small Screens */}
                <div className="hidden sm:flex items-center gap-2">
                  <LuDot />
                  <p>{company}</p>
                </div>
              </div>

              {/* Badge Section (shown for small screens) */}
              <div className="lg:hidden mt-2">
                <span
                  className={`inline-block uppercase px-2 py-1 text-xs rounded-md ${tagClass}`}
                >
                  {tag}
                </span>
              </div>
            </div>
          </div>

          {/* Right Section: Tag and Date */}
          <div className="hidden lg:flex flex-col items-end gap-3 text-primary">
            <span
              className={`inline-block uppercase px-2 py-1 text-xs rounded-md ${tagClass}`}
            >
              {tag}
            </span>
            <p className="text-sm sm:text-xs">Connected on: {date}</p>
          </div>
        </div>
      );
    },
  },
];
