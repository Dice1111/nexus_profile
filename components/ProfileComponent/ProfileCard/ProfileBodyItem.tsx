import { typeIconMap } from "@/lib/icon";
import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "@/types/enums";
import { ProfileDndComponent } from "@/types/types";

import Image from "next/image";
import {
  FacebookEmbed,
  InstagramEmbed,
  TikTokEmbed,
  YouTubeEmbed,
  LinkedInEmbed,
  XEmbed,
} from "react-social-media-embed";
// import { text } from "stream/consumers";

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
  [PROFILE_COMPONENT_CATEGORY.TEXT]: (value: string, type: string) => {
    let text_component = null; // Declare text_component outside the switch
    switch (type) {
      case PROFILE_COMPONENT_TYPE.PARAGRAPH:
        text_component = (
          <div className="px-8 py-4 text-sm font-thin relative">
            <p>{value}</p>
          </div>
        );
        break;

      case PROFILE_COMPONENT_TYPE.HEADING:
        text_component = (
          <div className="px-8 py-2 text-lg font-thin relative">
            <p>{value}</p>
          </div>
        );
        break;

      default:
        text_component = (
          <div className="px-8 py-4 text-sm font-thin relative">
            <p>{value}</p>
          </div>
        );
        break;
    }

    return text_component;
  },

  [PROFILE_COMPONENT_CATEGORY.MAP]: (value: string) => {
    const getEmbedURL = (address: string) => {
      if (!address?.trim()) return "";
      const encodedAddress = encodeURIComponent(address.trim());
      return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    };

    const embedURL = getEmbedURL(value);

    if (!embedURL) {
      return <div className="p-4 text-gray-500">No address provided</div>;
    }

    return (
      <div className="relative px-4">
        <iframe
          src={embedURL}
          className="w-full h-80 rounded-lg"
          allowFullScreen
          loading="lazy"
          title="Google Maps Embed"
          aria-label={`Map of ${value}`}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  },

  [PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED]: (value: string, type: string) => {
    let embedComponent = null; // Declare embedComponent outside the switch

    switch (type) {
      case PROFILE_COMPONENT_TYPE.FACEBOOK_POST:
        embedComponent = <FacebookEmbed url={value} width="100%" />;
        break;
      case PROFILE_COMPONENT_TYPE.INSTAGRAM_POST:
        embedComponent = <InstagramEmbed url={value} width="100%" />;
        break;
      case PROFILE_COMPONENT_TYPE.YOUTUBE_POST:
        embedComponent = (
          <div className="rounded-lg overflow-hidden h-[350px] w-full ">
            <YouTubeEmbed url={value} width="100%" />;
          </div>
        );
        break;
      case PROFILE_COMPONENT_TYPE.TIKTOK_POST:
        embedComponent = <TikTokEmbed url={value} />;
        break;
      case PROFILE_COMPONENT_TYPE.TWITTER_POST:
        embedComponent = <XEmbed url={value} width="100%" />;
        break;
      case PROFILE_COMPONENT_TYPE.LINKEDIN_POST:
        embedComponent = <LinkedInEmbed url={value} width="100%" />;
        break;
      default:
        embedComponent = <div>Unsupported social media type</div>;
        break;
    }

    return (
      <div className="relative px-4 flex justify-center">{embedComponent}</div>
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

  [PROFILE_COMPONENT_CATEGORY.FILE]: (
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
