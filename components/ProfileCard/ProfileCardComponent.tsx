import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profileContext";
import { CiEdit } from "react-icons/ci";
import { GiCheckMark } from "react-icons/gi";
import ProfileBodyItem from "./ProfileBodyItem";

const ProfileCardComponent = () => {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { components, layoutData, isEditing, setEditing } = context;

  return (
    <div className="mt-10 relative mx-auto w-full max-w-[400px] flex flex-col bg-[#050505] text-primary-foreground overflow-hidden rounded-lg">
      <Button
        variant={"ghost"}
        size="icon"
        className="absolute top-4 left-4 bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground rounded-lg transition z-10"
        onClick={() => {
          setEditing(!isEditing);
        }}
      >
        {isEditing ? <GiCheckMark /> : <CiEdit />}
      </Button>

      {/* header area */}
      {layoutData}

      {/* item area */}

      <div className="flex flex-col gap-3 pb-4  w-full">
        {components.map((item) => (
          <ProfileBodyItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
export default ProfileCardComponent;
