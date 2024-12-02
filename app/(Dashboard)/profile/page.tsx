import { ProfileCard, ProfileDndComponent } from "@/lib/type";

import ClientSideProfilePage from "./ClientSideProfilePage";
import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";
import ProfileEditor from "@/components/ProfileComponent/ProfileEditor/ProfileEditor";

const getProfileCardData = async (): Promise<ProfileCard> => {
  const data = await fetchUserProfileCardData("1");
  if (!data) throw new Error("No data found");
  return data;
};

const getProfileComponentsData = async (): Promise<ProfileDndComponent[]> => {
  const data = await fetchUserProfileDndComponentsData("1");
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
      >
        <ProfileEditor />
      </ClientSideProfilePage>
    </>
  );
};

export default Page;
