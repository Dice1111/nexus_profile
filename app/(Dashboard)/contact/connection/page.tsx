import ContactPagination from "@/components/Pagination/contact-pagination";
import { columns } from "@/components/Table/contact/column";
import { ConnectionTable } from "@/components/Table/contact/connection-table";
import { IRawSearchParams } from "@/core/domain/services/types/search-params-handler-service.type";

import { Suspense } from "react";
import { ConnectionAction } from "./action";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<IRawSearchParams>;
}) {
  const searchParam = await searchParams;

  const { data } = await ConnectionAction(searchParam);
  return (
    <div className="flex flex-col gap-4">
      <div className="text-md ">
        <p>
          Found {data.totalPage.toString()} results ( Showing page{" "}
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
