import { typeIconMap } from "@/lib/icon";
import { PROFILE_COMPONENT_CATEGORY, ProfileComponent } from "@/lib/type";
import Image from "next/image";
import { IoCloudUploadOutline } from "react-icons/io5";

interface ItemProps {
  item: ProfileComponent;
}

// Mapping for each type
const frameComponents = {
  [PROFILE_COMPONENT_CATEGORY.MAIL]: (
    value: string,
    type: string,
    display_text: string
  ) => (
    <a href={`mailto:${value}`}>
      <div className="flex  items-center gap-5 relative p-2 mx-4 rounded hover:scale-105 transition">
        <div className="bg-secondary text-secondary-foreground rounded-full p-2">
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          <p>{value}</p>
          <div className="font-thin text-sm">{display_text}</div>
        </div>
      </div>
    </a>
  ),

  [PROFILE_COMPONENT_CATEGORY.PHONE]: (
    value: string,
    type: string,
    display_text: string
  ) => (
    <div className="flex items-center gap-5 relative p-2  mx-4 rounded hover:scale-105 transition">
      <div className="bg-secondary text-secondary-foreground rounded-full p-2">
        {typeIconMap[type as keyof typeof typeIconMap]}
      </div>
      <div>
        {value} <br />
        <div className="font-thin text-sm">{display_text}</div>
      </div>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.IMAGE]: (value: string) => (
    <div className="relative">
      <Image
        src={value}
        width={500}
        height={500}
        alt="Uploaded image"
        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.TEXT]: (value: string, display_text: string) => (
    <div className="p-2 text-center relative">
      <p>{value}</p>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.VIDEO]: (value: string, display_text: string) => {
    const getEmbedURL = (url: string) => {
      try {
        const urlObj = new URL(url);
        if (
          urlObj.hostname === "www.youtube.com" ||
          urlObj.hostname === "youtube.com"
        ) {
          const videoId = urlObj.searchParams.get("v");
          return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }
        if (urlObj.hostname === "youtu.be") {
          const videoId = urlObj.pathname.substring(1);
          return `https://www.youtube.com/embed/${videoId}`;
        }
        return url; // Return original if it's not a recognized YouTube URL
      } catch {
        return url; // Fallback for invalid URLs
      }
    };

    const embedURL = getEmbedURL(value);

    return (
      <div className="relative px-4">
        <iframe
          src={embedURL}
          className="w-full h-80 rounded-lg"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  },
  [PROFILE_COMPONENT_CATEGORY.MAP]: (value: string, display_text: string) => {
    const getEmbedURL = (address: string) => {
      const encodedAddress = encodeURIComponent(address.trim());
      return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    };

    const embedURL = getEmbedURL(value);

    return (
      <div className="relative px-4">
        <iframe
          src={embedURL}
          className="w-full h-80 rounded-lg"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    );
  },

  [PROFILE_COMPONENT_CATEGORY.FILE]: (_: string, display_text: string) => (
    <div className="flex items-center justify-center p-4 bg-gray-200 rounded">
      <IoCloudUploadOutline className="text-xl" />
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.LINK]: (
    value: string,
    type: string,
    display_text: string
  ) => (
    <a href={value}>
      <div className="flex items-center gap-5 relative p-2  mx-4 rounded hover:scale-105 transition">
        <div className="bg-secondary text-secondary-foreground rounded-full p-2">
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          <p>{display_text}</p>
        </div>
      </div>
    </a>
  ),
};

// Get item frame based on type
const getItemFrame = (
  type: string,
  catagory: string,
  value?: string,
  display_text?: string
) => {
  console.log(value, display_text);
  if (value === undefined || display_text === undefined) return null;

  return frameComponents[catagory as keyof typeof frameComponents]
    ? frameComponents[catagory as keyof typeof frameComponents](
        value,
        type,
        display_text
      )
    : null;
};

export default function ProfileDroppable({ item }: ItemProps) {
  return (
    <div>
      {getItemFrame(item.type, item.category, item.value, item.display_text)}
    </div>
  );
}
