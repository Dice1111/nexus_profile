import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";
import { ContactRequestAction } from "./action";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import ConnectionRequestList from "@/components/List/ConnectionRequestList";
import { Suspense } from "react";
import ContactPagination from "@/components/Pagination/contact-pagination";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const searchParam = await searchParams;

  const { data } = await ContactRequestAction(searchParam, ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-md ">
        <p>
          Found {data.totalCount.toString()} results ( Showing page{" "}
          {data.currentPage.toLocaleString()} of{" "}
          {data.totalPage.toLocaleString()} )
        </p>
      </div>
      <ConnectionRequestList data={data.requests} />
      <Suspense fallback={null}>
        <ContactPagination
          currentPage={data.currentPage}
          totalPages={data.totalPage}
        />
      </Suspense>
    </div>
  );
}
