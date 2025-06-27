import { fetchCardDataAction } from "./action";
import ClientSideProfilePage from "./ClientSideProfilePage";

interface Props {
  params: Promise<{ id: string }>;
}

const Page = async (props: Props) => {
  const searchParams = await props.params;

  console.log("searchParams", searchParams);

  const profileCardData = await fetchCardDataAction(searchParams.id);

  console.log("profileCardData", profileCardData);

  return (
    <>
      <ClientSideProfilePage profileCardData={profileCardData} />
    </>
  );
};

export default Page;
