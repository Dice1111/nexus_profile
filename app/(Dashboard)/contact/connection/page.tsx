import ContactList from "@/components/List/ContactList";
import ContactPagination from "@/components/Pagination/contact-pagination";
import { IRawSearchParams } from "@/core/_domain/types/search-params-handler-service.type";
import { ITEMS_PER_PAGE } from "@/lib/utils";
import { Suspense } from "react";
import {
  fetchCardIdandTitleByUserIdAction,
  fetchContactsWithPaginationDataBySearchParamsAction,
} from "./action";
import NoCardSkeleton from "@/components/skeleton/NoCardSkeleton";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const rawParams = await searchParams;

  let cardId = rawParams.cardId;

  if (!cardId) {
    const cardsData = await fetchCardIdandTitleByUserIdAction();
    if (cardsData?.data?.length > 0) {
      cardId = cardsData.data[0].id;
    }
  }
  if (!cardId) {
    return <NoCardSkeleton />;
  }

  const enrichedParams: IRawSearchParams = {
    ...rawParams,
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
