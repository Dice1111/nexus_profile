"use client";

import Form from "next/form";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "../ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { URL_PAGE } from "@/lib/utils";

interface ContactPaginationProps {
  currentPage: number;
  totalPages: number;
}

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
}: ContactPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  if (totalPages <= 1) return null;

  const handleSubmit = async (formData: FormData) => {
    const query = formData.get(URL_PAGE) as string;
    const newParams = new URLSearchParams(searchParams);
    newParams.set(URL_PAGE, query.trim());
    const newURL = `${pathname}?${newParams.toString()}`;
    router.replace(newURL);
  };

  return (
    <Pagination>
      <PaginationContent className="flex items-center justify-between gap-3 ">
        {/* Previous */}
        <PaginationItem>
          <Form action={handleSubmit}>
            <input
              type="hidden"
              name={URL_PAGE}
              value={(currentPage - 1).toString()}
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
              <Form action={handleSubmit}>
                <input type="hidden" name={URL_PAGE} value={page.toString()} />
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
          <Form action={handleSubmit}>
            <input
              type="hidden"
              name={URL_PAGE}
              value={(currentPage + 1).toString()}
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
