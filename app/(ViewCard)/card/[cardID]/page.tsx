import notFound from "@/app/not-found";
import ProfileCardComponent from "@/components/ProfileComponent/ProfileCard/ProfileCardComponent";
import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";

interface Props {
  params: { cardID: string };
}

export default async function Page({ params: { cardID } }: Props) {
  const [profileData, componentsData] = await Promise.all([
    fetchUserProfileCardData(cardID),
    fetchUserProfileDndComponentsData(cardID),
  ]);

  return (
    <div className="flex justify-center items-center mt-4">
      {profileData && componentsData ? (
        <ProfileCardComponent
          profileData={profileData!}
          components={componentsData}
        />
      ) : (
        notFound()
      )}
    </div>
  );
}
