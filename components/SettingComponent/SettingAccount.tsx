"use client";
import { SettingAccountDataType } from "@/lib/setting/type";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SettingAccount({
  ...profileData
}: SettingAccountDataType) {
  const [profilePicture, setProfilePicture] = useState<string | null>(
    profileData.image || null
  );
  const [firstName, setFirstName] = useState<string>(profileData.firstName);
  const [middleName, setMiddleName] = useState<string>(
    profileData?.middleName || ""
  );
  const [lastName, setLastName] = useState<string>(profileData.lastName);
  const [email, setEmail] = useState<string>(profileData.email);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

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

  const handleSaveName = (
    firstName: string,
    middleName: string,
    lastName: string
  ) => {
    console.log("Name saved:", { firstName, middleName, lastName });
    setIsEditingName(false);
  };

  const handleCancelEditName = () => {
    setIsEditingName(false);
  };

  const handleSaveEmail = (email: string) => {
    console.log("Email saved:", email);
    setIsEditingEmail(false);
  };

  const handleCancelEditEmail = () => {
    setIsEditingEmail(false);
  };

  const handleResetPassword = () => {
    console.log("Password reset initiated.");
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted.");
  };

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Account Settings</h2>
      <div className="p-6 mx-auto bg-secondary text-secondary-foreground rounded-lg">
        {/* Profile Picture Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Profile Picture</h3>
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden">
              <AvatarImage
                className="object-cover w-full h-full"
                src={profilePicture || undefined}
                alt={`${firstName} ${lastName}`}
              />
              <AvatarFallback className="bg-primary text-primary-foreground w-full h-full flex items-center justify-center rounded-full">
                {`${firstName[0]}${lastName[0]}`.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <label>
              <Button
                variant="outline"
                className="relative bg-secondary border-primary hover:bg-primary hover:text-primary-foreground cursor-pointer"
              >
                Upload
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

        {/* Name Fields Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Name</h3>
          {!isEditingName ? (
            <div className="flex flex-col gap-3 ">
              <p>
                {firstName} {middleName} {lastName}
              </p>
              <div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingName(true)}
                  className=" bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-w-sm">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="bg-secondary border-primary px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
                placeholder="Middle Name"
                className="bg-secondary border-primary px-3 py-2 text-sm border rounded-md"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="bg-secondary border-primary px-3 py-2 text-sm border rounded-md"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleSaveName(firstName, middleName, lastName)
                  }
                  className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelEditName}
                  className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Email Address Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Email</h3>
          {!isEditingEmail ? (
            <div className="flex flex-col gap-3 ">
              <p>{email}</p>
              <div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingEmail(true)}
                  className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Edit
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="bg-secondary border-primary px-3 py-2 text-sm border rounded-md"
              />
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleSaveEmail(email)}
                  className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelEditEmail}
                  className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Reset Password Section */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Reset Password</h3>
          <Button
            variant="outline"
            className="bg-secondary border-primary hover:bg-primary hover:text-primary-foreground"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </div>

        {/* Delete Account Section */}
        <div>
          <h3 className="text-lg font-medium mb-2">Delete Account</h3>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            Delete
          </Button>
        </div>
      </div>
    </section>
  );
}
