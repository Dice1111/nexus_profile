import ContactList from "@/components/List/ContactList";
import ContactPagination from "@/components/Pagination/contact-pagination";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { Suspense } from "react";
import { fetchContactsWithPaginationDataBySearchParamsAction } from "./action";
import ContactSkeleton from "@/components/skeleton/ContactSkeleton";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const searchParam = await searchParams;
  const cardId = "085e949c-1696-48a1-bbde-6535b5400bba";

  const enrichedParams = {
    ...searchParam,
    cardId,
  };

  const { data } = await fetchContactsWithPaginationDataBySearchParamsAction(
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
      <ContactList contacts={data.contacts} />

      <Suspense fallback={null}>
        <ContactPagination
          currentPage={data.currentPage}
          totalPages={data.totalPage}
        />
      </Suspense>
    </div>
  );
}
