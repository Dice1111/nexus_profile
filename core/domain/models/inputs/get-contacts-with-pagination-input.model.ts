import { Prisma } from "@prisma/client";

export interface GetContactsWithPaginationInputModel {
  whereClause?: Prisma.ContactWhereInput;
  orderBy?: Prisma.ContactOrderByWithRelationInput;
  offset: number;
}
