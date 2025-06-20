import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";
import ClientSideProfilePage from "./ClientSideProfilePage";
import { ProfileCard, ProfileDndComponent } from "@/lib/types/types";
import { notFound } from "next/navigation";

const getProfileCardData = async (): Promise<ProfileCard> => {
  const data = await fetchUserProfileCardData("1");
  if (!data) throw new Error("No data found");
  return data;
};

const getProfileComponentsData = async (): Promise<ProfileDndComponent[]> => {
  const data = await fetchUserProfileDndComponentsData("1");
  return data;
};

interface Props {
  params: Promise<{ cardID: string }>;
}

const Page = async (props: Props) => {
  try {
    const searchParams = await props.params;
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
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
};

export default Page;
