"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

// Define enum for profile component types and categories
enum PROFILE_COMPONENT_TYPE {
  IMAGE = "img",
  TEXT = "text",
  PHONE = "phone",
  EMAIL = "email",
  LINK = "link",
  YOUTUBE = "youtube",
  MAP = "map",
  DISCORD = "discord",
}

enum PROFILE_COMPONENT_CATEGORY {
  IMAGE = "image",
  TEXT = "text",
  PHONE = "phone",
  MAIL = "mail",
  LINK = "link",
  VIDEO = "video",
  MAP = "map",
}

// Define the ProfileComponent type
interface ProfileComponent {
  id: string;
  card_id: string;
  type: PROFILE_COMPONENT_TYPE;
  category: PROFILE_COMPONENT_CATEGORY;
  display_text?: string;
  value: string;
}

// Initial profileComponents array
const profileComponents: ProfileComponent[] = [
  {
    id: "1",
    card_id: "1",
    type: PROFILE_COMPONENT_TYPE.IMAGE,
    category: PROFILE_COMPONENT_CATEGORY.IMAGE,
    display_text: "Profile Image",
    value: "/image/profile.jpg",
  },
  {
    id: "2",
    card_id: "1",
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    display_text: "Name",
    value: "John Doe",
  },
  {
    id: "3",
    card_id: "1",
    type: PROFILE_COMPONENT_TYPE.PHONE,
    category: PROFILE_COMPONENT_CATEGORY.PHONE,
    display_text: "Phone Number",
    value: "58385936",
  },
  {
    id: "4",
    card_id: "1",
    type: PROFILE_COMPONENT_TYPE.EMAIL,
    category: PROFILE_COMPONENT_CATEGORY.MAIL,
    display_text: "Email Address",
    value: "apple@gmail.com",
  },
  {
    id: "5",
    card_id: "1",
    type: PROFILE_COMPONENT_TYPE.LINK,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    display_text: "Personal Website",
    value: "https://example.com",
  },
];

// Define Zod schema with type-specific validation
const profileComponentSchema = z.discriminatedUnion("type", [
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.EMAIL),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.MAIL),
    display_text: z.string().optional(),
    value: z.string().email("Invalid email address"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.PHONE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.PHONE),
    display_text: z.string().optional(),
    value: z.string().regex(/^\d{10,15}$/, "Invalid phone number"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.LINK),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string().url("Invalid URL"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.TEXT),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.TEXT),
    display_text: z.string().optional(),
    value: z.string().min(1, "Text cannot be empty"),
  }),
  z.object({
    id: z.string(),
    card_id: z.string(),
    type: z.literal(PROFILE_COMPONENT_TYPE.IMAGE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.IMAGE),
    display_text: z.string().optional(),
    value: z.string().min(1, "Image URL cannot be empty"),
  }),
]);

// Form component
const DynamicProfileForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    components: ProfileComponent[];
  }>({
    mode: "onChange", // Enables validation on change
    resolver: zodResolver(
      z.object({
        components: z.array(profileComponentSchema),
      })
    ),
    defaultValues: {
      components: profileComponents,
    },
  });

  const onSubmit = (data: { components: ProfileComponent[] }) => {
    console.log("Form Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      {profileComponents.map((component, index) => (
        <div key={component.id} className="mb-4">
          <label
            htmlFor={`components.${index}.value`}
            className="block text-sm font-medium text-white"
          >
            {component.display_text || component.type}
          </label>
          <Input
            id={`components.${index}.value`}
            {...register(`components.${index}.value` as const)}
            type="text"
            placeholder={`Enter ${component.type}`}
            className="mt-1 block w-full border-gray-300"
            style={{
              borderColor: errors.components?.[index]?.value ? "red" : "black",
            }}
          />
          {errors.components?.[index]?.value && (
            <p className="text-sm text-red-500 mt-1">
              {errors.components[index]?.value?.message}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicProfileForm;
