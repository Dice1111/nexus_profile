import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";
import { IContactFilter } from "../types/search-params-handler-service.type";
import {
  IContactOrganizedSearchParams,
  CreateContactInput,
  ContactWithSpecificCardData,
} from "../types/contact-repository.types";

export interface IContactRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IContactOrganizedSearchParams
  ): Promise<ContactWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IContactFilter): Promise<number>;
  create(data: CreateContactInput): Promise<void>;
  delete(contactId: number): Promise<void>;
  updateTagOrNote(data: IUpdateTagOrNoteData): Promise<void>;
  fetchTotalContactCountByCardId(cardId: string[]): Promise<number>;
  fetchTotalFollowerCountByCardId(cardId: string[]): Promise<number>;
  fetchDailyFollowerCountByCardId(
    cardId: string[]
  ): Promise<{ date: Date; count: number }[]>;
}
