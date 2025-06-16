"use client";

import InfoRow from "@/components/Row/InfoRow";
import { IFlatContact } from "@/core/domain/repositories/types/contact.types";
import { ColumnDef } from "@tanstack/react-table";
export const columns: ColumnDef<IFlatContact>[] = [
  {
    accessorKey: "contactPersonFullname",
    header: () => <h1 className="text-primary">Username</h1>,
    cell: ({ row }) => {
      const { tag, createdAt, occupation, company, fullName } = row.original;

      return (
        <InfoRow
          fullName={fullName}
          occupation={occupation}
          company={company}
          image={""}
          date={createdAt}
          tag={tag}
        />
      );
    },
  },
];
