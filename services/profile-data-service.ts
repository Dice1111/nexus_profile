import { profileDndComponents, profileCard } from "@/constant/appData";
import { ProfileDndComponent, ProfileCard } from "@/types/types";


// Fetch profile components by card ID
export async function fetchUserProfileDndComponentsData(
  card_id: string
): Promise<ProfileDndComponent[]> {
  return profileDndComponents.filter((component) => component.card_id === card_id);
}

// Fetch a profile card by card ID
export async function fetchUserProfileCardData(
  card_id: string
): Promise<ProfileCard | null> {
  const card = profileCard.find((card) => card.card_id === card_id);
  return card || null; // Return null if no card is found
}




