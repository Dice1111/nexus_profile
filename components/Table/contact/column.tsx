"use client";

import InfoRow from "@/components/Row/InfoRow";
import { ContactWithDetails } from "@/types/types";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ContactWithDetails>[] = [
  {
    accessorKey: "contactPersonFullname",
    header: ({ column }) => (
      <button
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="flex justify-start items-center  text-primary hover:text-primary/50 font-semibold text-base cursor-pointer"
      >
        Username
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </button>
    ),
    cell: ({ row }) => {
      const {
        contactPersonFullname: fullname,
        contactPersonImage: image,
        contactPersonOccupation: occupation,
        contactPersonCompany: company,
        tag,
        created_at: date,
      } = row.original;

      return (
        <InfoRow
          fullname={fullname}
          occupation={occupation}
          company={company}
          image={image}
          date={date}
          tag={tag}
        />
      );
    },
  },
];
