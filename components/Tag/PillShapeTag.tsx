import { CONTACT_TAG_ENUM } from "@/core/_domain/enum/contact-tag.enum";
import React from "react";

// Define the color scheme for tags
const TagColorScheme: Record<CONTACT_TAG_ENUM, { bg: string; text: string }> = {
  [CONTACT_TAG_ENUM.FAVOURITE]: { bg: "bg-red-200", text: "text-red-800" },
  [CONTACT_TAG_ENUM.NEW]: { bg: "bg-green-200", text: "text-green-800" },
  [CONTACT_TAG_ENUM.COLLEAGUE]: { bg: "bg-red-100", text: "text-red-700" },
  [CONTACT_TAG_ENUM.FAMILY]: { bg: "bg-green-100", text: "text-green-700" },
  [CONTACT_TAG_ENUM.FRIEND]: { bg: "bg-yellow-200", text: "text-yellow-800" },
  [CONTACT_TAG_ENUM.CLIENT]: { bg: "bg-blue-200", text: "text-blue-800" },
  [CONTACT_TAG_ENUM.SUPPLIER]: { bg: "bg-orange-200", text: "text-orange-800" },
  [CONTACT_TAG_ENUM.EMPLOYEE]: { bg: "bg-purple-200", text: "text-purple-800" },
  [CONTACT_TAG_ENUM.INVESTOR]: { bg: "bg-cyan-200", text: "text-cyan-800" },
  [CONTACT_TAG_ENUM.VENDOR]: { bg: "bg-pink-200", text: "text-pink-800" },
  [CONTACT_TAG_ENUM.OTHER]: { bg: "bg-gray-200", text: "text-gray-800" },
};

export default function PillShapeTag({ tag }: { tag: CONTACT_TAG_ENUM }) {
  const tagColors = TagColorScheme[tag];

  return (
    <span
      className={`inline-block uppercase text-xs rounded-xl px-2 py-1 ${tagColors.bg} ${tagColors.text}`}
    >
      {tag}
    </span>
  );
}
