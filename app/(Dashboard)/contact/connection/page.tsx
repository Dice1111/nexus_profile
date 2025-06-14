import ContactPagination from "@/components/Pagination/contact-pagination";
import { columns } from "@/components/Table/contact/column";
import { ConnectionTable } from "@/components/Table/contact/connection-table";
import { parseSearchParams } from "@/lib/url-state";
import {
  fetchContactWithPagination,
  fetchTotalContactCount,
} from "@/services/contact-service";
import { getContactWithPaginationUseCase } from "@/core/application/use-cases/contact/getContactWithPaginationUseCase";
import { getTotalContactCountUseCase } from "@/core/application/use-cases/contact/getTotalContactCountUseCase";
import { ITEMS_PER_PAGE } from "@/util/utils";

import { Suspense } from "react";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchKeywordParam = await searchParams;
  const parsedSearchParams = parseSearchParams(searchKeywordParam);

  const [contacts, totalContactCount] = await Promise.all([
    getContactWithPaginationUseCase(parsedSearchParams),
    getTotalContactCountUseCase(parsedSearchParams),
  ]);

  const totalPages = Math.ceil(totalContactCount.count / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(parsedSearchParams.page) || 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-md ">
        <p>
          Found {totalContactCount.count.toString()} results ( Showing page{" "}
          {currentPage.toLocaleString()} of {totalPages.toLocaleString()} )
        </p>
      </div>
      <ConnectionTable columns={columns} data={contacts} />

      <Suspense fallback={null}>
        <ContactPagination
          currentPage={currentPage}
          totalPages={totalPages}
          searchParams={parsedSearchParams}
        />
      </Suspense>
    </div>
  );
}
