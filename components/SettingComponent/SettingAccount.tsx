"use client";
import {
  IUpdateUsernameActionState,
  updateUsernameAction,
} from "@/app/(Dashboard)/setting/action";
import { UserSettingResponse } from "@/core/_domain/types/user-repository.types";
import {
  UpdateUsernameData,
  updateUsernameSchema,
} from "@/schema/user/update-username.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";
import {
  ChangeEvent,
  startTransition,
  useActionState,
  useEffect,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { displayErrorToast } from "../Box/errorToastBox";
import { displaySuccessToast } from "../Box/successToastBox";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useUserTriggerStore } from "@/state_management/user.state";

interface SettingAccountProps {
  data: UserSettingResponse;
}
const updateUsernameInitialState: IUpdateUsernameActionState = {
  success: false,
  message: "",
};

export default function SettingAccount({ data }: SettingAccountProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    data.image || null
  );

  const [isUpdateNameActionTriggered, setIsUpdateNameActionTriggered] =
    useState(false);
  const [updateNameState, updateNameAction, isPendingUpdateName] =
    useActionState(updateUsernameAction, updateUsernameInitialState);

  useEffect(() => {
    if (isUpdateNameActionTriggered && !isPendingUpdateName) {
      if (updateNameState.success) {
        useUserTriggerStore.getState().triggerRefetch();
        displaySuccessToast({ message: updateNameState.message });
      } else if (!updateNameState.success) {
        displayErrorToast({ message: updateNameState.message });
      }
      setIsUpdateNameActionTriggered(false);
    }
  }, [isUpdateNameActionTriggered, updateNameState, isPendingUpdateName]);

  const handleProfilePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleDeletePicture = () => {
    setProfilePicture(null);
  };

  const handleResetPassword = () => console.log("Password reset initiated.");
  const handleDeleteAccount = () => console.log("Account deleted.");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UpdateUsernameData>({
    resolver: zodResolver(updateUsernameSchema),
    mode: "onBlur",
    defaultValues: {
      name: data.name,
    },
  });

  return (
    <section className="flex flex-col  text-primary">
      {/* Avatar */}
      <div className="bg-secondary flex flex-col rounded-lg">
        <div className="flex-col flex gap-4 p-6 ">
          <h3 className="text-lg font-medium pb-1 border-b border-primary/20">
            Profile
          </h3>

          <div className="flex justify-between items-center gap-6">
            <Avatar className="w-20 h-20 rounded-full overflow-hidden">
              <AvatarImage
                className="object-cover w-full h-full"
                src={profilePicture || undefined}
                alt={data.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center rounded-full">
                {data.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex gap-3">
              <Button
                className="relative bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                variant={"outline"}
              >
                Change picture
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleProfilePictureUpload}
                />
              </Button>

              {/* Delete picture */}
              <Button
                className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                variant={"outline"}
                onClick={handleDeletePicture}
              >
                Delete picture
              </Button>
            </div>
          </div>
        </div>

        {/* Display Name */}

        <div className="flex-col flex gap-4 p-6">
          <h3 className="text-lg font-medium pb-1 border-b border-primary/20">
            Display Name
          </h3>
          <p className="text-sm text-muted-foreground">
            Please enter your account display name
          </p>
          <form
            onSubmit={handleSubmit((data) =>
              startTransition(() => {
                updateNameAction(data);
                setIsUpdateNameActionTriggered(true);
              })
            )}
            className="flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <Input
                type="text"
                {...register("name")}
                placeholder="Your display name"
                disabled={isPendingUpdateName}
                className="w-full sm:w-64 md:w-80 px-3 py-2 border border-primary rounded-md bg-secondary text-sm"
              />
              {errors.name && (
                <p className="text-sm text-red-400">{errors.name.message}</p>
              )}
            </div>
            <Button
              className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
              variant={"outline"}
              disabled={isPendingUpdateName}
              type="submit"
            >
              {isPendingUpdateName ? "Updating..." : "Update Name"}
            </Button>
          </form>
        </div>

        {/* Email */}
        <div className="flex-col flex gap-4 p-6">
          <h3 className="text-lg font-medium pb-1 border-b border-primary/20">
            Email Address
          </h3>
          <p className="text-sm text-muted-foreground">
            This is the address we’ll use for notifications and password resets.
          </p>
          <div className="flex items-center gap-4">
            <Input
              disabled
              type="email"
              value={data.email}
              className="w-full sm:w-64 md:w-80 px-3 py-2 border border-primary rounded-md bg-secondary text-sm"
            />
          </div>
        </div>

        {/* Reset Password */}
        <div className=" flex flex-col gap-4 p-6">
          <h3 className="text-lg font-medium pb-1 border-b border-primary/20">
            Reset Password
          </h3>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Set a new password for your account.
            </p>
            <Button
              className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
              onClick={handleResetPassword}
              variant={"outline"}
            >
              Reset Password
            </Button>
          </div>
        </div>

        {/* Delete Account */}
        <div className="flex flex-col gap-4 p-6">
          <h3 className="text-lg font-medium pb-1 border-b border-primary/20">
            Delete Account
          </h3>

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data.
            </p>

            <Button
              className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
              variant="outline"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
