"use client";
import { useState, ChangeEvent } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { SettingAccountDataType } from "@/lib/setting/type";
import { Input } from "../ui/input";

export default function SettingAccount({
  ...profileData
}: SettingAccountDataType) {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profileData.image || null
  );
  const [fullName, setFullName] = useState(profileData.firstName);
  const [email, setEmail] = useState(profileData.email);

  const handleProfilePictureUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSaveName = () => {
    console.log("Name saved:", fullName);
    // TODO: call your API to persist fullName
  };

  const handleSaveEmail = () => {
    console.log("Email saved:", email);
    // TODO: call your API to persist email
  };
  const handleDeletePicture = () => {
    setProfilePicture(null);
  };

  const handleResetPassword = () => console.log("Password reset initiated.");
  const handleDeleteAccount = () => console.log("Account deleted.");

  return (
    <section className="mx-auto mt-6 flex flex-col  text-primary">
      {/* Avatar */}
      <div className="bg-secondary p-6 flex flex-col gap-10 rounded-lg">
        <div className="flex-col flex gap-4 ">
          <h3 className="text-lg font-medium">Avatar</h3>
          <p className="text-sm text-muted-foreground">
            This is your avatar. Use the buttons below to change or remove it.
          </p>
          <div className="flex items-center gap-6">
            <Avatar className="w-16 h-16  rounded-full overflow-hidden">
              <AvatarImage
                className="object-cover w-full h-full"
                src={profilePicture || undefined}
                alt={fullName}
              />
              <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center rounded-full">
                {fullName?.slice(0, 2).toUpperCase()}
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
            Please enter your full name, or a display name you are comfortable
            with.
          </p>
          <div className="flex items-center gap-4">
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your display name"
              className="flex-1 px-3 py-2 border border-primary rounded-md bg-secondary text-sm max-w-sm"
            />
            <Button onClick={handleSaveName}>Save</Button>
          </div>
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
              value={email}
              className="flex-1 px-3 py-2 border border-primary rounded-md bg-secondary text-sm max-w-sm"
            />
          </div>
        </div>

        {/* Reset Password */}
        <div className="flex-col flex gap-4">
          <h3 className="text-lg font-medium">Reset Password</h3>
          <p className="text-sm text-muted-foreground">
            Set a new password for your account.
          </p>
          <Button className="max-w-xs" onClick={handleResetPassword}>
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
            className="max-w-xs"
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
