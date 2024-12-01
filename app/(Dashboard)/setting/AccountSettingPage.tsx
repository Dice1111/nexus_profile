"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface ProfileData {
  name: string;
  email: string;
  profilePicture?: string | null;
}

interface AccountSettingsPageProps {
  profileData: ProfileData;
}

export default function AccountSettingsPage({
  profileData,
}: AccountSettingsPageProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profileData.profilePicture || null
  );
  const [email, setEmail] = useState<string>(profileData.email);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handleProfilePictureUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangeEmail = () => {
    console.log("Email updated to:", email);
  };

  const handleResetPassword = () => {
    console.log("Password reset initiated.");
  };

  const handleDeleteAccount = () => {
    setIsDeletingAccount(true);
    setTimeout(() => {
      console.log("Account deleted.");
      setIsDeletingAccount(false);
    }, 2000);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Account Setting</h2>
      <div className=" mx-auto p-6 bg-secondary text-secondary-foreground rounded-lg ">
        {/* Profile Picture Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Profile Picture</h2>
          <div className="flex items-center space-x-6">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20">
              <AvatarImage
                src={profilePicture || "/default-avatar.png"}
                alt={profileData.name}
              />
              <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center">
                {profileData.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <label>
              <Button
                variant="outline"
                className="relative bg-secondary border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                Upload Picture
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleProfilePictureUpload}
                />
              </Button>
            </label>
          </div>
        </div>

        {/* Email Address Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Connected Email Address</h2>
          <div className="flex flex-wrap gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-secondary border-primary px-4 py-2 border rounded-md max-w-md md:w-auto"
            />
            <Button
              variant="outline"
              onClick={handleChangeEmail}
              className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
            >
              Update Email
            </Button>
          </div>
        </div>

        {/* Reset Password Section */}
        <div className="mb-8">
          <h2 className="text-lg  font-medium mb-3">Reset Password</h2>
          <Button
            variant="outline"
            className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>

        {/* Delete Account Section */}
        <div className="mb-8">
          <h2 className="text-lg font-medium mb-3">Delete Account</h2>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isDeletingAccount}
          >
            {isDeletingAccount ? "Deleting..." : "Delete Account"}
          </Button>
        </div>
      </div>
    </div>
  );
}
