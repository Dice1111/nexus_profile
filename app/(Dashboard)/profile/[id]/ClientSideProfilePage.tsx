"use client";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { FetchDesignData } from "@/core/_domain/types/design-repository.types";
import { FetchInformationData } from "@/core/_domain/types/information-repository.types";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { useDesign } from "@/state_management/design.state";
import { useInformation } from "@/state_management/information.state";
import { useProfileComponents } from "@/state_management/profile-component.state";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

interface ProfileProps {
  profileCardData: {
    profileComponents: FetchProfileComponentData[];
    information: FetchInformationData | null;
    design: FetchDesignData | null;
  };
}

const ProfileCardComponent = dynamic(
  () =>
    import("@/components/ProfileComponent/ProfileCard/ProfileCardComponent"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

const EditProfileCardComponent = dynamic(
  () =>
    import(
      "@/components/ProfileComponent/EditProfileCard/EditProfileCardComponent"
    ),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
);

export default function ClientSideProfilePage({
  profileCardData,
}: ProfileProps) {
  // State for editing
  const [isEditing, setEditing] = useState(false);
  //State for loading
  const [isLoading, setLoading] = useState(false);

  //STATE MANAGEMENT

  const setInformation = useInformation((state) => state.setInformation);
  const setDesign = useDesign((state) => state.setDesign);
  const setProfileComponents = useProfileComponents(
    (state) => state.setProfileComponents
  );

  const information = useInformation((state) => state);
  const design = useDesign((state) => state);
  const profileComponents = useProfileComponents((state) => state);

  // Initialize Zustand state from props
  useEffect(() => {
    if (profileCardData.information) {
      setInformation(profileCardData.information);
    }
  }, [profileCardData.information, setInformation]);

  useEffect(() => {
    if (profileCardData.design) {
      setDesign(profileCardData.design);
    }
  }, [profileCardData.design, setDesign]);

  useEffect(() => {
    if (profileCardData.profileComponents) {
      setProfileComponents(profileCardData.profileComponents);
    }
  }, [profileCardData.profileComponents, setProfileComponents]);

  useEffect(() => {
    console.log("Zustand State ->");
    console.log("Information:", information);
    console.log("Design:", design);
    console.log("Components:", profileComponents);
  }, [information, design, profileComponents]);

  // Form setup
  // const form = useForm<{ components: ProfileDndComponentSchemaType[] }>({
  //   mode: "onBlur",
  //   resolver: zodResolver(
  //     z.object({
  //       components: z.array(profileDndInputSchema),
  //     })
  //   ),
  //   defaultValues: {
  //     components: components as ProfileDndComponentSchemaType[],
  //   },
  // });
  // const fieldArray = useFieldArray({
  //   control: form.control,
  //   name: "components",
  // });

  return (
    // <>
    //   <div className=" flex flex-col p-4 sm:p-0 gap-5 sm:flex-row justify-center relative">
    //     <div className="mt-10  gap-5 flex flex-col mx-auto">
    //       {/* MANAGE BUTTON */}
    //       {!isEditing ? (
    //         <div className="flex gap-2 justify-end">
    //           <Button
    //             variant="outline"
    //             size="icon"
    //             type="button"
    //             onClick={(e) => {
    //               e.preventDefault();
    //               setEditing(true);
    //             }}
    //           >
    //             <CiEdit />
    //           </Button>

    //           <QRButton cardId={information.cardId} />
    //         </div>
    //       ) : (
    //         <div className="flex gap-2 justify-end">
    //           <Button
    //             variant="outline"
    //             size="icon"
    //             type="submit"
    //             form="profileForm"
    //             disabled={isLoading}
    //             onClick={() => {
    //               console.log("save");
    //             }}
    //           >
    //             <GiCheckMark />
    //           </Button>

    //           <Button
    //             variant="outline"
    //             size="icon"
    //             type="button"
    //             disabled={isLoading}
    //             onClick={() => {
    //               window.location.reload();
    //             }}
    //           >
    //             <RxCross2 />
    //           </Button>
    //         </div>
    //       )}

    //       {/* MANAGE MAIN CARD */}
    //       {isEditing ? (
    //         <EditProfileCardComponent key="edit" />
    //       ) : (
    //         <ProfileCardComponent
    //           key="view"
    //           components={components}
    //           design={design}
    //           information={information}
    //         />
    //       )}
    //     </div>
    //     {isEditing && !isLoading && <ProfileEditor />}
    //   </div>
    // </>

    <div>Hello</div>
  );
}
