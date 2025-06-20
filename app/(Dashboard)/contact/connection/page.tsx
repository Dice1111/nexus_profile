import ContactPagination from "@/components/Pagination/contact-pagination";
import { columns } from "@/components/Table/contact/column";
import { ConnectionTable } from "@/components/Table/contact/connection-table";
import { IRawSearchParams } from "@/core/_domain/services/types/search-params-handler-service.type";

import { Suspense } from "react";
import { ContactConnectionAction } from "./action";
import { ITEMS_PER_PAGE } from "@/lib/utils";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const searchParam = await searchParams;
  const cardId = "1c41b717-d565-47f6-a569-10774f2c8d4b";

  const enrichedParams = {
    ...searchParam,
    cardId,
  };

  const { data } = await ContactConnectionAction(
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
      <ConnectionTable columns={columns} data={data.contacts} />

      <Suspense fallback={null}>
        <ContactPagination
          currentPage={data.currentPage}
          totalPages={data.totalPage}
        />
      </Suspense>
    </div>
  );
}
