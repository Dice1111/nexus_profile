"use client";
import { SearchParams } from "@/lib/url-state";
import Form from "next/form";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { usePathname } from "next/navigation";

interface ContactPaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: SearchParams;
}

interface OldUrlValueProps {
  searchParams: SearchParams;
  pageNumber: Number;
}

const OldUrlValue = ({ searchParams, pageNumber }: OldUrlValueProps) => {
  return (
    <div>
      {Object.entries(searchParams).map(
        ([key, value]) =>
          key !== "page" && (
            <input key={key} type="hidden" name={key} value={value as string} />
          )
      )}
      <input type="hidden" name="page" value={pageNumber.toString()} />
    </div>
  );
};

const getPageRange = (
  currentPage: number,
  totalPages: number
): (number | "...")[] => {
  const delta = 2;
  const range: (number | "...")[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  //always include first page no
  range.push(1);

  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) {
    range.push(i);
  }
  if (right < totalPages - 1) range.push("...");

  //always include first page no
  if (totalPages > 1) range.push(totalPages);
  return range;
};

export default function ContactPagination({
  currentPage,
  totalPages,
  searchParams,
}: ContactPaginationProps) {
  if (totalPages <= 1) return null;

  const pathname = usePathname();

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-between gap-3 ">
        {/* Previous */}
        <PaginationItem>
          <Form action={pathname}>
            <OldUrlValue
              searchParams={searchParams}
              pageNumber={currentPage - 1}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={currentPage <= 1}
            >
              ←
            </Button>
          </Form>
        </PaginationItem>

        {/* Page Numbers */}
        {getPageRange(currentPage, totalPages).map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={`ellipsis-${idx}`}>...</PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <Form action={pathname}>
                <OldUrlValue searchParams={searchParams} pageNumber={page} />
                <Button
                  type="submit"
                  variant={page === currentPage ? "secondary" : "ghost"}
                  className=""
                  size="sm"
                >
                  {page}
                </Button>
              </Form>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <Form action={pathname}>
            <OldUrlValue
              searchParams={searchParams}
              pageNumber={currentPage + 1}
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              disabled={currentPage >= totalPages}
            >
              →
            </Button>
          </Form>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
