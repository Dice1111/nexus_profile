import ConnectionRequestList from "@/components/List/ConnectionRequestList";
import ContactPagination from "@/components/Pagination/contact-pagination";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { Suspense } from "react";
import { fetchRequestWithPaginationDataAction } from "./action";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const searchParam = await searchParams;

  const cardId = "ca2ca944-959f-4d4d-8ec1-5f5b8066ec2b";

  const enrichedParams = {
    ...searchParam,
    cardId,
  };

  const { data } = await fetchRequestWithPaginationDataAction(
    enrichedParams,
    ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="text-md ">
        <p>
          Found {data.totalCount.toString()} results ( Showing page{" "}
          {data.currentPage.toLocaleString()} of{" "}
          {data.totalPage.toLocaleString()} )
        </p>
      </div>
      <ConnectionRequestList requests={data.requests} />
      <Suspense fallback={null}>
        <ContactPagination
          currentPage={data.currentPage}
          totalPages={data.totalPage}
        />
      </Suspense>
    </div>
  );
}
