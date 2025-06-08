import { getRequestWithPagination } from "@/core/infrastructure/models/request";
import { SearchParams } from "@/lib/url-state";
import { ITEMS_PER_PAGE } from "@/util/utils";
import { Prisma } from "@prisma/client";

export async function getRequestWithPaginationUseCase(
  searchParams: SearchParams
) {
  const requestedPage = Math.max(1, Number(searchParams?.page) || 1);
  const offset = (requestedPage - 1) * ITEMS_PER_PAGE;

  const cardId = "applecard";

  const whereClause: Prisma.RequestWhereInput = {
    cardId: cardId,
  };

  if (searchParams.search) {
    const keyword = searchParams.search;
    whereClause.SenderCard = {
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

  let orderBy: Prisma.RequestOrderByWithRelationInput = {
    createdAt: "desc",
  };

  if (sortItem && allowedSortFields.includes(sortItem)) {
    if (sortItem === "createdAt") {
      orderBy = {
        [sortItem]: sortOrder,
      };
    } else {
      orderBy = {
        SenderCard: {
          Information: {
            [sortItem]: sortOrder,
          },
        },
      };
    }
  }

  console.log(whereClause, orderBy, offset);

  const requests = await getRequestWithPagination({
    whereClause,
    orderBy,
    offset,
  });

  return requests;
}
