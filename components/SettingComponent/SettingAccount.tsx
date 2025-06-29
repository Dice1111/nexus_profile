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
    <section className="mx-auto mt-6 flex flex-col  text-primary">
      {/* Avatar */}
      <div className="bg-secondary p-6 flex flex-col gap-10 rounded-lg">
        <div className="flex-col flex gap-4 ">
          <h3 className="text-lg font-medium">Avatar</h3>

          <div className="flex items-center gap-6">
            <Avatar className="w-16 h-16  rounded-full overflow-hidden">
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
              {/* Change picture */}
              <label className="relative">
                <Button>
                  Change picture
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleProfilePictureUpload}
                  />
                </Button>
              </label>

              {/* Delete picture */}
              <Button variant="destructive" onClick={handleDeletePicture}>
                Delete picture
              </Button>
            </div>
          </div>
        </div>

        {/* Display Name */}

        <div className="flex-col flex gap-4">
          <h3 className="text-lg font-medium">Display Name</h3>
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
            className="flex flex-col gap-2"
          >
            <div className="flex items-center gap-4">
              <Input
                type="text"
                {...register("name")}
                placeholder="Your display name"
                disabled={isPendingUpdateName}
                className="flex-1 px-3 py-2 border border-primary rounded-md bg-secondary text-sm max-w-xs"
              />

              <Button disabled={isPendingUpdateName} type="submit">
                {isPendingUpdateName ? "Saving..." : "Save"}
              </Button>
            </div>
            {errors.name && (
              <p className="text-sm text-red-400">{errors.name.message}</p>
            )}
          </form>
        </div>

        {/* Email */}
        <div className="flex-col flex gap-4">
          <h3 className="text-lg font-medium">Email</h3>
          <p className="text-sm text-muted-foreground">
            This is the address we’ll use for notifications and password resets.
          </p>
          <div className="flex items-center gap-4">
            <Input
              disabled
              type="email"
              value={data.email}
              className="flex-1 px-3 py-2 border border-primary rounded-md bg-secondary text-sm max-w-xs"
            />
          </div>
        </div>

        {/* Reset Password */}
        <div className="flex-col flex gap-4">
          <h3 className="text-lg font-medium">Reset Password</h3>
          <p className="text-sm text-muted-foreground">
            Set a new password for your account.
          </p>
          <Button className="max-w-[200px]" onClick={handleResetPassword}>
            Reset Password
          </Button>
        </div>

        {/* Delete Account */}
        <div className="flex-col flex gap-4">
          <h3 className="text-lg font-medium">Delete Account</h3>
          <p className="text-sm text-muted-foreground">
            Permanently delete your account and all associated data.
          </p>
          <Button
            className="max-w-[200px]"
            variant="destructive"
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </div>
      </div>
    </section>
  );
}
