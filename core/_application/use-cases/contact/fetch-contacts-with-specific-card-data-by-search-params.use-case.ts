import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-tag.enum";
import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import {
  IContactWithSpecificCardData,
  IRawContactWithSpecificCardData,
} from "@/core/_domain/repositories/types/contact.types";
import {
  IContactFilter,
  IContactSort,
  ISanitizedContactSearchParams,
} from "@/core/_domain/services/types/search-params-handler-service.type";

function ToFlatContact(
  rawContactData: IRawContactWithSpecificCardData[]
): IContactWithSpecificCardData[] {
  if (rawContactData.length === 0) return [];
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

export type IFetchContactsWithSpecificCardDataBySearchParamsUseCase =
  ReturnType<typeof fetchContactsWithSpecificCardDataBySearchParamsUseCase>;

export const fetchContactsWithSpecificCardDataBySearchParamsUseCase =
  (contactRepository: IContactRepository) =>
  async (
    sanitizedSearchParams: ISanitizedContactSearchParams,
    itemsPerPage: number
  ): Promise<IContactWithSpecificCardData[]> => {
    const whereClauseRequirement: IContactFilter = {
      cardId: sanitizedSearchParams.cardId,
      tags: sanitizedSearchParams.filters,
      keyword: sanitizedSearchParams.search,
    };

    const sortClauseRequirement: IContactSort = {
      item: sanitizedSearchParams.sortItem,
      order: sanitizedSearchParams.sortOrder,
    };

    const requestPage = sanitizedSearchParams.page;

    const rawContactData =
      await contactRepository.fetchWithSpecificCardDataBySearchParams({
        itemsPerPage,
        requestPage,
        whereClauseRequirement,
        sortClauseRequirement,
      });

    console.log(rawContactData);
    const contactData = ToFlatContact(rawContactData);
    console.log(contactData);

    return contactData;
  };
