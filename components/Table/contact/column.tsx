"use client";

import { ArrowUpDown } from "lucide-react";
import { Contact, CONTACT_TAG_TYPE } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import InfoRow from "@/components/Row/InfoRow";

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
      const {
        connectedUsername: name,
        connectedUserImage: image,
        connectedUserOccupation: occupation,
        connectedUserCompany: company,
        tag,
        created_at: date,
      } = row.original;

      return (
        <InfoRow
          name={name}
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
