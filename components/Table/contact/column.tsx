"use client";

import InfoRow from "@/components/Row/InfoRow";
import { FlatContactDTO } from "@/src/infrastructure/contact/contact";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<FlatContactDTO>[] = [
  {
    accessorKey: "contactPersonFullname",
    header: () => <h1 className="text-primary">Username</h1>,
    cell: ({ row }) => {
      const {
        tag,
        createdAt,
        occupation,
        company,
        firstName,
        middleName,
        lastName,
      } = row.original;

      return (
        <InfoRow
          firstName={firstName}
          lastName={lastName}
          middleName={middleName}
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
