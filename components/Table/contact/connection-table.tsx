"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

import ProfileCardSheet, {
  ConnectionSheetVarient,
  SHEET_VARIENT,
} from "@/components/Sheet/ProfileCardSheet";
import { ContactWithDetails } from "@/types/types";

interface DataTableProps {
  columns: ColumnDef<ContactWithDetails>[];
  data: ContactWithDetails[];
}

export function ConnectionTable({ columns, data }: DataTableProps) {
  const [selectedRowData, setSelectedRowData] =
    useState<ConnectionSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleRowClick = (rowData: ContactWithDetails) => {
    const data: ConnectionSheetVarient = {
      cardId: rowData.contactPersonCardID,
      fullname: rowData.contactPersonFullname,
      tag: rowData.tag,
      note: rowData.note,
      date: rowData.created_at,
    };
    setSelectedRowData(data);
    setIsSheetOpen(true);
  };

  // Filtering logic based on the selected tag
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* Table Section */}
      <div className="bg-secondary text-primary rounded-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-primary" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="border-gray-400 hover:bg-primary/20 cursor-pointer"
                  key={row.id}
                  onClick={() => {
                    handleRowClick(row.original);
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ContactSheet - Pass the selected row data */}
      {isSheetOpen && selectedRowData && (
        <ProfileCardSheet
          isOpen={isSheetOpen}
          setIsOpen={setIsSheetOpen}
          sheetData={selectedRowData}
          sheetVarient={SHEET_VARIENT.CONNECTION}
        />
      )}
    </div>
  );
}
