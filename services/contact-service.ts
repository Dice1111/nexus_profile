import { detailsContact, detailsContactData } from "@/constant/appData";
import { ConnectionRequestWithDetails, ContactWithDetails } from "@/types/types";





export async function fetchContactData(): Promise<ContactWithDetails[]> {
  //need to combine first,middle and last name to fullname
  const data = detailsContactData;

  return data;
}



export async function fetchConnectionRequestData(): Promise<
  ConnectionRequestWithDetails[]
> {
  //need to combine first,middle and last name to fullname
  return detailsContact;
}


