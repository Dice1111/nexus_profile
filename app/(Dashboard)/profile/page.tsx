import { ProfileCard, ProfileComponent } from "@/lib/type";

import {
  fetchProfileCardData,
  fetchProfileComponentsData,
} from "@/services/profile-data-service";
import ClientSideProfilePage from "./ClientSideProfilePage";

const getProfileCardData = async (): Promise<ProfileCard> => {
  const data = await fetchProfileCardData();
  return data;
};

const getProfileComponentsData = async (): Promise<ProfileComponent[]> => {
  const data = await fetchProfileComponentsData();
  return data;
};

const Page = async () => {
  // Fetch from database
  const profileComponents = await getProfileComponentsData();
  const profileCard = await getProfileCardData();

  return (
    <>
      <ClientSideProfilePage
        profileComponentData={profileComponents}
        profileCardData={profileCard}
      />
    </>
  );
};

export default Page;
