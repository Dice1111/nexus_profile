"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Contact, CONTACT_TAG_TYPE } from "@/lib/type";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import ProfileCardSheet, {
  ConnectionSheetVarient,
  SHEET_VARIENT,
} from "@/components/Sheet/ProfileCardSheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react"; // Optional icon for the dropdown

interface DataTableProps {
  columns: ColumnDef<Contact>[];
  data: Contact[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedRowData, setSelectedRowData] =
    useState<ConnectionSheetVarient | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false); // Track the sheet's open state
  const [selectedTag, setSelectedTag] = useState<CONTACT_TAG_TYPE | "All">(
    "All"
  );

  const filteredData = useMemo(() => {
    return selectedTag === "All"
      ? data
      : (data as Contact[]).filter((contact) => contact.tag === selectedTag);
  }, [selectedTag, data]); // Recompute filteredData when selectedTag or data changes

  const handleRowClick = (rowData: Contact) => {
    const data: ConnectionSheetVarient = {
      cardId: rowData.connectedUserCardID,
      name: rowData.connectedUsername,
      tag: rowData.tag,
      note: rowData.note,
      date: rowData.created_at,
    };
    setSelectedRowData(data);
    setIsSheetOpen(true);
  };

  // Filtering logic based on the selected tag
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      columnFilters,
    },
  });

  const tagOptions = Object.values(CONTACT_TAG_TYPE); // Get all enum values

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">My Connections</h2>
      {/* Search and Dropdown Menu Section */}
      <div className="flex flex-row items-center gap-4 mb-4 justify-between ">
        {/* Search Input - Adjusts for screen size */}
        <Input
          placeholder="Filter name..."
          value={
            (table
              .getColumn("connectedUsername")
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table
              .getColumn("connectedUsername")
              ?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-md  h-12 bg-secondary text-secondary-foreground border-2 border-primary"
        />

        {/* Dropdown to filter based on selected tag */}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2  capitalize  "
            >
              {`View ${selectedTag}`} <ChevronDownIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {/* Add a "View All" option */}
            <DropdownMenuItem
              key="All"
              onClick={() => setSelectedTag("All")}
              className="cursor-pointer"
            >
              View All
            </DropdownMenuItem>

            {/* Dynamically generate the dropdown items from CONTACT_TAG_TYPE enum */}
            {tagOptions.map((tag) => (
              <DropdownMenuItem
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="cursor-pointer"
              >
                {`View ${tag.charAt(0).toUpperCase() + tag.slice(1)}`}
                {/* Capitalize first letter */}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table Section */}
      <div className="bg-secondary text-secondary-foreground rounded-md">
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

      {/* Pagination Section */}
      <div className="flex items-center justify-end space-x-2 py-4 text-primary-foreground">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
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
