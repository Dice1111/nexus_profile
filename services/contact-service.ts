import { detailsContact, detailsContactData } from "@/constant/appData";
import { SearchParams } from "@/lib/url-state";
import {
  ConnectionRequestWithDetails,
  ContactWithDetails,
} from "@/lib/types/types";
import { ITEMS_PER_PAGE } from "@/util/utils";

export async function fetchContactData(): Promise<ContactWithDetails[]> {
  //need to combine first,middle and last name to fullname
  const data = detailsContactData;

  return data;
}

export async function fetchConnectionRequestData(): Promise<
  ConnectionRequestWithDetails[]
> {
  //need to combine first,middle and last name to fullname
  return detailsContact;
}

export async function fetchContactWithPagination(searchParams: SearchParams) {
  let requestedPage = Math.max(1, Number(searchParams?.page) || 1);

  // const filters = [searchFilter(searchParams.search)];

  // const whereClasue = filters.length > 0 ? filters : undefined;
  const offset = (requestedPage - 1) * ITEMS_PER_PAGE;

  const paginatedContactData = detailsContactData;

  return paginatedContactData;
}

export async function fetchTotalContactCount(searchParams: SearchParams) {
  return 200;
}
