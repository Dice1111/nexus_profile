import { prisma } from "@/lib/prisma-client";
import { CONTACT_TAG_TYPE } from "@/types/enums";
import { ITEMS_PER_PAGE } from "@/util/utils";
import { Prisma } from "@prisma/client";

export interface contactDTO {
  id: number;
  cardId: string;
  contactCardId: string;
  createdAt: string;
  updatedAt: string;
  tag: CONTACT_TAG_TYPE;
  note: string | null;
  ContactCard: {
    id: string;
    title: string | null;
    userId: string;
    createdAt: string;
    updatedAt: string;
    Information: {
      occupation: string | null;
      company: string | null;
      firstNname: string | null;
      middleName: string | null;
      lastName: string | null;
    } | null;
  };
}

interface getContactWithPaginationDTO {
  whereClause?: Prisma.ContactWhereInput;
  orderBy?: Prisma.ContactOrderByWithRelationInput;
  offset: number;
}

export async function getContactWithPagination({
  whereClause,
  orderBy,
  offset,
}: getContactWithPaginationDTO) {
  const contacts = await prisma.contact.findMany({
    where: whereClause,
    orderBy: orderBy,
    skip: offset,
    take: ITEMS_PER_PAGE,
    include: {
      ContactCard: {
        select: {
          id: true,
          title: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
          Information: {
            select: {
              occupation: true,
              company: true,
              firstName: true,
              middleName: true,
              lastName: true,
            },
          },
        },
      },
    },
  });

  return contacts;
}
// export async function getTotalContactCount(): Promise<totalContactCountDTO> {
//   return 200;
// }
