"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfileContext } from "@/context/profileContext";
import { ProfileCard } from "@/lib/types/types";

type Field = {
  id: string;
  label: string;
  type: "text" | "textarea";
  placeholder: string;
};

const fields: Field[] = [
  { id: "prefix", label: "Prefix", type: "text", placeholder: "Mr/Ms/Mrs" },
  {
    id: "full_name",
    label: "Full Name",
    type: "text",
    placeholder: "Full Name",
  },
  { id: "suffix", label: "Suffix", type: "text", placeholder: "Suffix" },
  {
    id: "quote",
    label: "Your quote",
    type: "textarea",
    placeholder: "Type your message here.",
  },
  {
    id: "preferred_name",
    label: "Preferred Name",
    type: "text",
    placeholder: "Preferred Name",
  },
  { id: "pronouns", label: "Pronouns", type: "text", placeholder: "Pronouns" },
  { id: "title", label: "Title", type: "text", placeholder: "Title" },
  {
    id: "occupation",
    label: "Occupation",
    type: "text",
    placeholder: "Occupation",
  },
  { id: "company", label: "Company", type: "text", placeholder: "Company" },
  {
    id: "message",
    label: "Your message",
    type: "textarea",
    placeholder: "Type your message here.",
  },
];

export default function InformationEditModal() {
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { profileData, setProfileData } = context;

  const handleChange = (id: string, value: string) => {
    setProfileData((prevData: ProfileCard) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h2 className="text-2xl font-thin">Personal Information</h2>

      {fields.map((field) => (
        <div
          key={field.id}
          className="grid w-full max-w-sm items-center gap-1.5"
        >
          <Label htmlFor={field.id}>{field.label}</Label>
          {field.type === "textarea" ? (
            <Textarea
              id={field.id}
              placeholder={field.placeholder}
              value={profileData[field.id as keyof typeof profileData] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          ) : (
            <Input
              type="text"
              id={field.id}
              placeholder={field.placeholder}
              value={profileData[field.id as keyof typeof profileData] || ""}
              onChange={(e) => handleChange(field.id, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
