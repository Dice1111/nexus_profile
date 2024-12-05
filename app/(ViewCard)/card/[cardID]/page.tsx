import notFound from "@/app/not-found";
import ProfileCardComponent from "@/components/ProfileComponent/ProfileCard/ProfileCardComponent";
import { Button } from "@/components/ui/button";
import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";

interface Props {
  params: { cardID: string };
}

export default async function Page({ params: { cardID } }: Props) {
  try {
    const [profileData, componentsData] = await Promise.all([
      fetchUserProfileCardData(cardID),
      fetchUserProfileDndComponentsData(cardID),
    ]);

    if (!profileData || !componentsData) {
      return notFound();
    }

    return (
      <div className="flex justify-center w-full py-4 ">
        <div>
          <div className="flex justify-end mb-4">
            <Button variant="outline">Add Connection</Button>
          </div>

          <ProfileCardComponent
            profileData={profileData}
            components={componentsData}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
}
