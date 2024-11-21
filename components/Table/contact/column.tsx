"use client";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Contact } from "@/lib/type";
import { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";

const columnNameMap: Record<string, string> = {
  connectedUsername: "Username",
  connectedUserOccupation: "Occupation",
  connectedUserCompany: "Company",
  tag: "Tag",
  connectedDate: "Connected Date",
};

export const columns: ColumnDef<Contact>[] = Object.entries(columnNameMap).map(
  ([key, label]) => ({
    accessorKey: key,
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="justify-start "
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const value: any = row.getValue(key);

      return (
        <div className="flex items-center justify-start space-x-4">
          {key === "connectedUsername" ? (
            <>
              <Avatar>
                <AvatarImage src={row.original.connectedUserImage} />
                <AvatarFallback className="bg-secondary text-secondary-foreground w-full h-full flex items-center justify-center">
                  NX
                </AvatarFallback>
              </Avatar>
              <span>{value}</span>
            </>
          ) : key === "connectedDate" ? (
            <span className="justify-start pl-4">{value.toLocaleString()}</span>
          ) : (
            <span className="justify-start pl-4">{value}</span>
          )}
        </div>
      );
    },
  })
);
