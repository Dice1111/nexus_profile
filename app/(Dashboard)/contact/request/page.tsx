import ConnectionRequestList from "@/components/List/ConnectionRequestList";
import ContactPagination from "@/components/Pagination/contact-pagination";
import { parseSearchParams } from "@/lib/url-state";
import { getRequestWithPaginationUseCase } from "@/use-cases/request/getRequestWithPaginationUseCase";
import { getTotalRequestCountUseCase } from "@/use-cases/request/getTotalRequestCountUseCase";
import { ITEMS_PER_PAGE } from "@/util/utils";
import { Suspense } from "react";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const searchKeywordParam = await searchParams;
  const parsedSearchParams = parseSearchParams(searchKeywordParam);

  const [request, totalRequestCount] = await Promise.all([
    getRequestWithPaginationUseCase(parsedSearchParams),
    getTotalRequestCountUseCase(parsedSearchParams),
  ]);

  console.log(request);

  const totalPages = Math.ceil(totalRequestCount.count / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, Number(parsedSearchParams.page) || 1);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-md ">
        <p>
          Found {totalRequestCount.count.toString()} results ( Showing page{" "}
          {currentPage.toLocaleString()} of {totalPages.toLocaleString()} )
        </p>
      </div>
      <ConnectionRequestList data={request} />
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
