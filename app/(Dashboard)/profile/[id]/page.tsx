import {
  fetchUserProfileCardData,
  fetchUserProfileDndComponentsData,
} from "@/services/profile-data-service";
import ClientSideProfilePage from "./ClientSideProfilePage";
import { ProfileCard, ProfileDndComponent } from "@/lib/types/types";
import { notFound } from "next/navigation";
import { DesignModel } from "@/core/_domain/models/design.model";
import { InformationModel } from "@/core/_domain/models/information.model";
import { ProfileComponentModel } from "@/core/_domain/models/profile-component.model";
import { useActionState, useEffect } from "react";
import { fetchCardDataAction } from "./action";

interface Props {
  params: Promise<{ cardID: string }>;
}

const Page = async (props: Props) => {
  try {
    const searchParams = await props.params;

    const profileCardData = await fetchCardDataAction(searchParams.cardID);

    return (
      <>
        <ClientSideProfilePage
          profileComponentData={profileCardData.profileComponents}
          profileCardInformation={profileCardData.information}
          profileCardDesign={profileCardData.design}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching profile data:", error);
    return notFound();
  }
};

export default Page;
