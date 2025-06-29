import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-repository.enum";
import { IContactRepository } from "@/core/_domain/repositories/IContactRepository";
import {
  IContactWithSpecificCardData,
  IRawContactWithSpecificCardData,
} from "@/core/_domain/types/contact-repository.types";
import {
  IContactFilter,
  IContactSort,
  ISanitizedContactSearchParams,
} from "@/core/_domain/types/search-params-handler-service.type";

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
      createdAt: contact.createdAt.toISOString().split("T")[0],
      updatedAt: contact.updatedAt.toISOString().split("T")[0],
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

    const contactData = ToFlatContact(rawContactData);

    return contactData;
  };
