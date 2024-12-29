import { typeIconMap } from "@/lib/icon";
import { PROFILE_COMPONENT_CATEGORY, ProfileDndComponent } from "@/lib/type";
import Image from "next/image";

interface ItemProps {
  item: ProfileDndComponent;
  background_color: string;
  foreground_color: string;
}

// Mapping for each type
const frameComponents = {
  [PROFILE_COMPONENT_CATEGORY.MAIL]: (
    value: string,
    type: string,
    display_text: string,
    background_color: string,
    foreground_color: string
  ) => (
    <a href={`mailto:${value}`}>
      <div className="flex  items-center gap-5 relative p-2 mx-4 rounded hover:scale-105   transition">
        <div
          className=" rounded-full p-2"
          style={{ backgroundColor: foreground_color, color: background_color }}
        >
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
    display_text: string,
    background_color: string,
    foreground_color: string
  ) => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleClick = () => {
      if (isAndroid || isIPhone) {
        // Open the phone dialer on Android or iPhone
        window.location.href = `tel:${value}`;
      } else {
        // Copy the phone number to clipboard on other devices
        navigator.clipboard.writeText(value);
        alert("Phone number copied to clipboard!");
      }
    };

    return (
      <div
        onClick={handleClick}
        className="flex items-center gap-5 relative p-2 mx-4 rounded hover:scale-105 transition cursor-pointer"
      >
        <div
          className="rounded-full p-2"
          style={{ backgroundColor: foreground_color, color: background_color }}
        >
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          {value} <br />
          <div className="font-thin text-sm">{display_text}</div>
        </div>
      </div>
    );
  },

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
  [PROFILE_COMPONENT_CATEGORY.TEXT]: (value: string) => (
    <div className="px-8 pt-8 text-lg font-thin relative">
      <p>{value}</p>
    </div>
  ),
  [PROFILE_COMPONENT_CATEGORY.VIDEO]: (value: string) => {
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
  [PROFILE_COMPONENT_CATEGORY.MAP]: (value: string) => {
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

  [PROFILE_COMPONENT_CATEGORY.LINK]: (
    value: string,
    type: string,
    display_text: string,
    background_color: string,
    foreground_color: string
  ) => (
    <a href={value}>
      <div className="flex items-center gap-5 relative p-2  mx-4 rounded hover:scale-105  transition">
        <div
          className=" rounded-full p-2"
          style={{ backgroundColor: foreground_color, color: background_color }}
        >
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          <p>{display_text}</p>
        </div>
      </div>
    </a>
  ),
};

export default function ProfileBodyItem({
  item,
  background_color,
  foreground_color,
}: ItemProps) {
  if (item.value === undefined || item.display_text === undefined) return null;
  return frameComponents[item.category as keyof typeof frameComponents]
    ? frameComponents[item.category as keyof typeof frameComponents](
        item.value,
        item.type,
        item.display_text,
        background_color,
        foreground_color
      )
    : null;
}
