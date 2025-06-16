import { prisma } from "@/core/infrastructure/prisma/prisma-client";
import { CONTACT_TAG_TYPE, Prisma } from "@prisma/client";

interface ContactDTO {
  id: number;
  cardId: string;
  contactCardId: string;
  createdAt: Date;
  updatedAt: Date;
  tag: CONTACT_TAG_TYPE;
  note: string | null;
  ContactCard: {
    id: string;
    title: string | null;
    userId: string;
    Information: {
      occupation: string | null;
      company: string | null;
      firstName: string | null;
      middleName: string | null;
      lastName: string | null;
    } | null;
  };
}
export interface FlatContactDTO {
  id: number;
  cardId: string;
  contactCardId: string;
  tag: CONTACT_TAG_TYPE;
  note: string | null;
  createdAt: string;
  updatedAt: string;
  contactCardTitle: string | null;
  contactCardUserId: string;
  occupation: string | null;
  company: string | null;
  firstName: string | null;
  middleName: string | null;
  lastName: string | null;
}

interface GetContactWithPaginationDTO {
  whereClause?: Prisma.ContactWhereInput;
  orderBy?: Prisma.ContactOrderByWithRelationInput;
  offset: number;
}

function ToFlatContactDTOs(contacts: ContactDTO[]): FlatContactDTO[] {
  return contacts.map((contact) => {
    const info = contact.ContactCard?.Information;

    return {
      id: contact.id,
      cardId: contact.cardId,
      contactCardId: contact.contactCardId,
      tag: contact.tag,
      note: contact.note,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
      contactCardTitle: contact.ContactCard?.title ?? null,
      contactCardUserId: contact.ContactCard?.userId ?? "",
      occupation: info?.occupation ?? null,
      company: info?.company ?? null,
      firstName: info?.firstName ?? null,
      middleName: info?.middleName ?? null,
      lastName: info?.lastName ?? null,
    };
  });
}

export async function getContactWithPagination({
  whereClause,
  orderBy,
  offset,
}: 3) {
  try {
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

    return ToFlatContactDTOs(contacts);
  } catch (error: any) {
    throw new Error("Failed to retrieve Data.");
  }
}

// ************************************************************

interface ContactCountDTO {
  count: number;
}

interface GetContactCountDTO {
  whereClause?: Prisma.ContactWhereInput;
}

export async function getTotalContactCount({
  whereClause,
}: GetContactCountDTO): Promise<ContactCountDTO> {
  try {
    const contacts = await prisma.contact.count({
      where: whereClause,
    });

    return { count: contacts };
  } catch (error: any) {
    throw new Error("Failed to retrieve Data.");
  }
}

// ************************************************************

interface createContactWithRequestDTO {
  requestId: number;
  cardId: string;
  senderCardId: string;
}

export async function createContactWithRequest({
  cardId,
  senderCardId,
}: createContactWithRequestDTO) {
  try {
    await prisma.contact.create({
      data: {
        cardId,
        contactCardId: senderCardId,
      },
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return {
        success: false,
        message: "This contact already exists.",
      };
    }
    return {
      success: false,
      message: "An unexpected error occurred.",
    };
  }
}
