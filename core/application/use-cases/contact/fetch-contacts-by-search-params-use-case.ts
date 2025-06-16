import { CONTACT_TAG_ENUM } from "@/core/domain/enum/contact-tag.enum";
import { IContactRepository } from "@/core/domain/repositories/IContactRepository";
import {
  IFlatContact,
  IRawContact,
} from "@/core/domain/repositories/types/contact.types";
import {
  IContactFilter,
  IContactSort,
  ISanitizedSearchParams,
} from "@/core/domain/services/types/search-params-handler-service.type";

function ToFlatContact(rawContactData: IRawContact[]): IFlatContact[] {
  if (rawContactData.length > 0) return [];
  return rawContactData.map((contact) => {
    const info = contact.ContactCard?.Information;

    return {
      id: contact.id,
      cardId: contact.cardId,
      contactCardId: contact.contactCardId,
      tag: contact.tag as CONTACT_TAG_ENUM,
      note: contact.note,
      createdAt: contact.createdAt.toISOString(),
      updatedAt: contact.updatedAt.toISOString(),
      contactCardTitle: contact.ContactCard?.title ?? null,
      contactCardUserId: contact.ContactCard?.userId ?? "",
      occupation: info?.occupation ?? null,
      company: info?.company ?? null,
      fullName: info?.fullName ?? "No Name",
    };
  });
}

export type FetchContactsBySearchParamsUseCase = ReturnType<
  typeof fetchContactsBySearchParamsUseCase
>;

export const fetchContactsBySearchParamsUseCase =
  (contactRepository: IContactRepository) =>
  async (sanitizedSearchParams: ISanitizedSearchParams) => {
    const requestPage: number = Math.max(
      1,
      Number(sanitizedSearchParams.page) || 1
    );
    const whereClauseRequirement: IContactFilter = {
      cardId: sanitizedSearchParams.cardId,
      tags: sanitizedSearchParams.filters,
      keyword: sanitizedSearchParams.search,
    };

    const sortClauseRequirement: IContactSort = {
      item: sanitizedSearchParams.sortItem,
      order: sanitizedSearchParams.sortOrder,
    };

    const rawContactData = await contactRepository.fetchBySearchParams({
      requestPage,
      whereClauseRequirement,
      sortClauseRequirement,
    });

    return ToFlatContact(rawContactData);
  };
