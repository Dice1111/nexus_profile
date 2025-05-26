"use client";

import InfoRow from "@/components/Row/InfoRow";
import { ContactWithDetails } from "@/types/types";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ContactWithDetails>[] = [
  {
    accessorKey: "contactPersonFullname",
    header: () => <h1 className="text-primary">Username</h1>,
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
