"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProfileContext } from "@/context/profileContext";
import { ProfileCard } from "@/lib/types/types";
import {
  InformationState,
  useInformationState,
} from "@/state_management/information.state";

type Field = {
  id: string;
  label: string;
  type: "text" | "textarea";
  placeholder: string;
};

const fields: Field[] = [
  { id: "prefix", label: "Prefix", type: "text", placeholder: "Mr/Ms/Mrs" },
  {
    id: "fullName",
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
    id: "preferredName",
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
  const setField = useInformationState((state) => state.setField);

  return (
    <div className="flex flex-col gap-10">
      <h2 className="text-2xl font-thin">Personal Information</h2>

      {fields.map((field) => {
        // use individual selector for this field
        const value = useInformationState(
          (state) => state[field.id as keyof typeof state]
        );

        const fieldKey = field.id as keyof InformationState;

        return (
          <div
            key={field.id}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <Label htmlFor={field.id}>{field.label}</Label>
            {typeof value === "string" || value === null ? (
              field.type === "textarea" ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={value || ""}
                  onChange={(e) => setField(fieldKey, e.target.value)}
                />
              ) : (
                <Input
                  type="text"
                  id={field.id}
                  placeholder={field.placeholder}
                  value={value || ""}
                  onChange={(e) => setField(fieldKey, e.target.value)}
                />
              )
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
