import { CONTACT_TAG_TYPE } from "@prisma/client";
import React from "react";

// Define the color scheme for tags
const TagColorScheme: Record<CONTACT_TAG_TYPE, string> = {
  [CONTACT_TAG_TYPE.FAVOURITE]: "bg-red-600",
  [CONTACT_TAG_TYPE.NEW]: "bg-green-600",
  [CONTACT_TAG_TYPE.COLLEAGUE]: "bg-red-300",
  [CONTACT_TAG_TYPE.FAMILY]: "bg-green-300",
  [CONTACT_TAG_TYPE.FRIEND]: "bg-yellow-300",
  [CONTACT_TAG_TYPE.CLIENT]: "bg-blue-300",
  [CONTACT_TAG_TYPE.SUPPLIER]: "bg-orange-300",
  [CONTACT_TAG_TYPE.EMPLOYEE]: "bg-purple-300",
  [CONTACT_TAG_TYPE.INVESTOR]: "bg-cyan-300",
  [CONTACT_TAG_TYPE.VENDOR]: "bg-pink-300",
  [CONTACT_TAG_TYPE.OTHER]: "bg-gray-300",
};

export default function PillShapeTag({ tag }: { tag: CONTACT_TAG_TYPE }) {
  const tagClass = TagColorScheme[tag];

  return (
    <span
      className={`inline-block uppercase text-xs rounded-full px-2 py-1 ${tagClass} text-black`}
    >
      {tag}
    </span>
  );
}
