import { IUpdateTagOrNoteData } from "@/schema/contact/update-contact-or-delete.schema";
import { IContactFilter } from "../services/types/search-params-handler-service.type";
import {
  IContactOrganizedSearchParams,
  ICreateContactData,
  IRawContactWithSpecificCardData,
} from "./types/contact.types";

export interface IContactRepository {
  fetchWithSpecificCardDataBySearchParams(
    data: IContactOrganizedSearchParams
  ): Promise<IRawContactWithSpecificCardData[]>;

  fetchTotalCountBySearchParams(data: IContactFilter): Promise<number>;
  create(data: ICreateContactData): Promise<void>;
  delete(contactId: number): Promise<void>;
  updateTagOrNote(data: IUpdateTagOrNoteData): Promise<void>;
}
