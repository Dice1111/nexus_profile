import { getContactWithPagination } from "@/data-access/contact";
import { SearchParams } from "@/lib/url-state";
import { ITEMS_PER_PAGE } from "@/util/utils";
import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";

export async function getContactWithPaginationUseCase(
  searchParams: SearchParams
) {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (requestedPage - 1) * ITEMS_PER_PAGE;

  const cardId = "applecard";

  const whereClause: Prisma.ContactWhereInput = {
    cardId: cardId,
  };

  console.log(searchParams.filter);

  if (Array.isArray(searchParams.filter) && searchParams.filter.length > 0) {
    console.log(searchParams.filter);
    whereClause.tag = {
      in: searchParams.filter as CONTACT_TAG_TYPE[],
    };
  }

  if (searchParams.search) {
    const keyword = searchParams.search;
    whereClause.ContactCard = {
      Information: {
        OR: [
          { firstName: { contains: keyword, mode: "insensitive" } },
          { middleName: { contains: keyword, mode: "insensitive" } },
          { lastName: { contains: keyword, mode: "insensitive" } },
          { occupation: { contains: keyword, mode: "insensitive" } },
          { company: { contains: keyword, mode: "insensitive" } },
        ],
      },
    };
  }
  const allowedSortFields = ["firstName", "createdAt"];
  const sortItem = searchParams.sortItem;
  const sortOrder = searchParams.sortOrder === "desc" ? "desc" : "asc";

  let orderBy: Prisma.ContactOrderByWithRelationInput = {
    createdAt: "desc",
  };

  if (sortItem && allowedSortFields.includes(sortItem)) {
    if (sortItem === "createdAt") {
      orderBy = {
        [sortItem]: sortOrder,
      };
    } else {
      orderBy = {
        ContactCard: {
          Information: {
            [sortItem]: sortOrder,
          },
        },
      };
    }
  }

  console.log(whereClause, orderBy, offset);

  const contacts = await getContactWithPagination({
    whereClause,
    orderBy,
    offset,
  });

  return contacts;
}
