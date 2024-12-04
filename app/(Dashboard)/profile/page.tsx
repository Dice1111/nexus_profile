import { ProfileCard, ProfileDndComponent } from "@/lib/type";

import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";
import ClientSideProfilePage from "./ClientSideProfilePage";

const getProfileCardData = async (): Promise<ProfileCard> => {
  const data = await fetchUserProfileCardData("4");
  if (!data) throw new Error("No data found");
  return data;
};

const getProfileComponentsData = async (): Promise<ProfileDndComponent[]> => {
  const data = await fetchUserProfileDndComponentsData("4");
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
