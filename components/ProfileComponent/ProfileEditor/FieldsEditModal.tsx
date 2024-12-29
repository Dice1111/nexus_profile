"use client";

import { PROFILE_COMPONENT_CATEGORY, PROFILE_COMPONENT_TYPE } from "@/lib/type";
import { typeIconMap } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import { useProfileContext } from "@/context/profileContext";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

export default function FieldsEditModal() {
  // Data categorized by type
  const data = {
    "General Use": [
      {
        label: "Image",
        type: PROFILE_COMPONENT_TYPE.IMAGE,
        category: PROFILE_COMPONENT_CATEGORY.IMAGE,
      },
      {
        label: "Text",
        type: PROFILE_COMPONENT_TYPE.TEXT,
        category: PROFILE_COMPONENT_CATEGORY.TEXT,
      },
      {
        label: "Email",
        type: PROFILE_COMPONENT_TYPE.EMAIL,
        category: PROFILE_COMPONENT_CATEGORY.MAIL,
      },
      {
        label: "Link",
        type: PROFILE_COMPONENT_TYPE.LINK,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Map",
        type: PROFILE_COMPONENT_TYPE.MAP,
        category: PROFILE_COMPONENT_CATEGORY.MAP,
      },
    ],
    "Social Accounts": [
      {
        label: "Github",
        type: PROFILE_COMPONENT_TYPE.GITHUB,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Linkedin",
        type: PROFILE_COMPONENT_TYPE.LINKEDIN,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Facebook",
        type: PROFILE_COMPONENT_TYPE.FACEBOOK,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Instagram",
        type: PROFILE_COMPONENT_TYPE.INSTAGRAM,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Twitter",
        type: PROFILE_COMPONENT_TYPE.TWITTER,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "TikTok",
        type: PROFILE_COMPONENT_TYPE.TIKTOK,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Snapchat",
        type: PROFILE_COMPONENT_TYPE.SNAPCHAT,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Pinterest",
        type: PROFILE_COMPONENT_TYPE.PINTEREST,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Discord",
        type: PROFILE_COMPONENT_TYPE.DISCORD,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
    Communication: [
      {
        label: "Phone",
        type: PROFILE_COMPONENT_TYPE.PHONE,
        category: PROFILE_COMPONENT_CATEGORY.PHONE,
      },
      {
        label: "WhatsApp",
        type: PROFILE_COMPONENT_TYPE.WHATSAPP,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Telegram",
        type: PROFILE_COMPONENT_TYPE.TELEGRAM,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
    Conferencing: [
      {
        label: "Zoom",
        type: PROFILE_COMPONENT_TYPE.VIDEO,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Google Meet",
        type: PROFILE_COMPONENT_TYPE.GOOGLE_MEET,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Microsoft Teams",
        type: PROFILE_COMPONENT_TYPE.MICROSOFT_TEAMS,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
    Payment: [
      {
        label: "PayPal",
        type: PROFILE_COMPONENT_TYPE.PAYPAL,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Amazon Pay",
        type: PROFILE_COMPONENT_TYPE.AMAZON_PAY,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Apple Pay",
        type: PROFILE_COMPONENT_TYPE.APPLE_PAY,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
    "Embed Video": [
      {
        label: "YouTube",
        type: PROFILE_COMPONENT_TYPE.YOUTUBE,
        category: PROFILE_COMPONENT_CATEGORY.VIDEO,
      },
      {
        label: "Twitch",
        type: PROFILE_COMPONENT_TYPE.TWITCH,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
    Music: [
      {
        label: "Spotify",
        type: PROFILE_COMPONENT_TYPE.SPOTIFY,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Apple Music",
        type: PROFILE_COMPONENT_TYPE.APPLE_MUSIC,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Amazon Music",
        type: PROFILE_COMPONENT_TYPE.AMAZON_MUSIC,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
    Design: [
      {
        label: "Dribbble",
        type: PROFILE_COMPONENT_TYPE.DRIBBBLE,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
      {
        label: "Behance",
        type: PROFILE_COMPONENT_TYPE.BEHANCE,
        category: PROFILE_COMPONENT_CATEGORY.LINK,
      },
    ],
  };

  // Context for managing profile components
  const context = useProfileContext();
  if (!context) {
    console.warn("profileEditContext is null");
    return null;
  }

  const { profileData, setComponents } = context;

  const card_id = profileData.card_id; //

  // Function to create a new metadata component
  const createMetadataComponents = (
    type: PROFILE_COMPONENT_TYPE,
    category: PROFILE_COMPONENT_CATEGORY
  ) => {
    const newComponent = {
      id: uuidv4(),
      card_id: card_id, // Generate unique ID
      type: type,
      category: category,
      value: "",
      display_text: "",
    };

    // Update the context with the new component
    setComponents((prevComponents) => [...prevComponents, { ...newComponent }]);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h2 className="text-2xl font-thin">Fields</h2>

      {/* Render fields dynamically */}
      {Object.entries(data).map(([title, items]) => (
        <div key={title}>
          <h2 className="text-lg font-medium">{title}</h2>
          <div className="flex flex-wrap gap-2">
            {items.map(({ label, type, category }) => (
              <Button
                key={label}
                onClick={() => createMetadataComponents(type, category!)} // Pass function reference with arguments
                className="flex items-center gap-2 border bg-primary 
                  text-primary-foreground p-2 hover:bg-secondary hover:text-secondary-foreground rounded-md shadow-md"
              >
                {typeIconMap[type as keyof typeof typeIconMap]} {/* Map icon */}
                {label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
