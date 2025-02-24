import { CONTACT_TAG_TYPE } from "@/types/enums";
import React from "react";

// Define the color scheme for tags
const TagColorScheme: Record<CONTACT_TAG_TYPE, string> = {
  [CONTACT_TAG_TYPE.COLLEAGUE]: "bg-red-400",
  [CONTACT_TAG_TYPE.FAMILY]: "bg-green-400",
  [CONTACT_TAG_TYPE.FRIEND]: "bg-yellow-400",
  [CONTACT_TAG_TYPE.CLIENT]: "bg-blue-400",
  [CONTACT_TAG_TYPE.SUPPLIER]: "bg-orange-400",
  [CONTACT_TAG_TYPE.EMPLOYEE]: "bg-indigo-400",
  [CONTACT_TAG_TYPE.INVESTOR]: "bg-cyan-400",
  [CONTACT_TAG_TYPE.VENDOR]: "bg-pink-400",
  [CONTACT_TAG_TYPE.OTHER]: "bg-gray-400",
};

export default function PillShapeTag({ tag }: { tag: CONTACT_TAG_TYPE }) {
  const tagClass = TagColorScheme[tag];

  return (
    <span
      className={`inline-block uppercase text-xs rounded-full px-2 py-1 ${tagClass} text-white`}
    >
      {tag}
    </span>
  );
}
