"use client";

import InfoRow from "@/components/Row/InfoRow";
import { ContactWithDetails } from "@/services/contact-service";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<ContactWithDetails>[] = [
  {
    accessorKey: "contactPersonFullname",
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
