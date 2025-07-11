import {
  PROFILE_COMPONENT_CATEGORY,
  PROFILE_COMPONENT_TYPE,
} from "@/core/_domain/enum/profile-component-repository.enum";
import { FetchProfileComponentData } from "@/core/_domain/types/profile-component-repository.types";
import { typeIconMap } from "@/lib/icon";
import dynamic from "next/dynamic";
import Image from "next/image";

const SocialEmbed = dynamic(() => import("./SocialEmbed"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-gray-500 text-sm sm:text-base md:text-lg">
      Loading social embed...
    </p>
  ),
});

interface ProfileBodyItemProps {
  item: FetchProfileComponentData;
  background_color: string;
  foreground_color: string;
}

const frameComponents = {
  [PROFILE_COMPONENT_CATEGORY.MAIL]: (
    value: string,
    type: string,
    label: string,
    background_color: string,
    foreground_color: string
  ) => (
    <a href={`mailto:${value}`}>
      <div className="flex items-center gap-5 relative p-2 mx-4 rounded hover:scale-105 transition">
        <div
          className="rounded-full p-2"
          style={{ backgroundColor: foreground_color, color: background_color }}
        >
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          <p className="text-sm sm:text-base md:text-lg">{value}</p>
          <div className="font-thin text-xs sm:text-sm md:text-base">
            {label}
          </div>
        </div>
      </div>
    </a>
  ),

  [PROFILE_COMPONENT_CATEGORY.PHONE]: (
    value: string,
    type: string,
    label: string,
    background_color: string,
    foreground_color: string
  ) => {
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    const handleClick = () => {
      if (isAndroid || isIPhone) {
        window.location.href = `tel:${value}`;
      } else {
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
          <p className="text-sm sm:text-base md:text-lg">{value}</p>
          <div className="font-thin text-xs sm:text-sm md:text-base">
            {label}
          </div>
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
        loading="lazy"
        decoding="async"
        className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  ),

  [PROFILE_COMPONENT_CATEGORY.TEXT]: (value: string, type: string) => {
    let text_component = null;

    switch (type) {
      case PROFILE_COMPONENT_TYPE.PARAGRAPH:
        text_component = (
          <div className="px-8 py-4 font-thin relative text-sm sm:text-base md:text-lg">
            <p>{value}</p>
          </div>
        );
        break;

      case PROFILE_COMPONENT_TYPE.HEADING:
        text_component = (
          <div className="px-8 py-2 font-thin relative text-lg sm:text-xl md:text-2xl">
            <p>{value}</p>
          </div>
        );
        break;

      default:
        text_component = (
          <div className="px-8 py-4 font-thin relative text-sm sm:text-base md:text-lg">
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
      return (
        <div className="p-4 text-gray-500 text-sm sm:text-base md:text-lg">
          No address provided
        </div>
      );
    }

    return (
      <div className="relative px-4">
        <iframe
          src={embedURL}
          className="w-full h-80 rounded-lg"
          loading="lazy"
          title="Google Maps Embed"
          aria-label={`Map of ${value}`}
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
  },

  [PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED]: (value: string, type: string) => {
    let embedComponent = null;

    switch (type) {
      case PROFILE_COMPONENT_TYPE.FACEBOOK_POST:
        embedComponent = <SocialEmbed type="facebook" url={value} />;
        break;
      case PROFILE_COMPONENT_TYPE.INSTAGRAM_POST:
        embedComponent = <SocialEmbed type="instagram" url={value} />;
        break;
      case PROFILE_COMPONENT_TYPE.YOUTUBE_POST:
        embedComponent = <SocialEmbed type="youtube" url={value} />;
        break;
      case PROFILE_COMPONENT_TYPE.TIKTOK_POST:
        embedComponent = <SocialEmbed type="tiktok" url={value} />;
        break;
      case PROFILE_COMPONENT_TYPE.TWITTER_POST:
        embedComponent = <SocialEmbed type="twitter" url={value} />;
        break;
      case PROFILE_COMPONENT_TYPE.LINKEDIN_POST:
        embedComponent = <SocialEmbed type="linkedin" url={value} />;
        break;
      default:
        embedComponent = (
          <div className="text-center text-gray-500 text-sm sm:text-base md:text-lg">
            Unsupported social media type
          </div>
        );
        break;
    }

    return (
      <div className="relative px-4 flex justify-center">{embedComponent}</div>
    );
  },

  [PROFILE_COMPONENT_CATEGORY.LINK]: (
    value: string,
    type: string,
    label: string,
    background_color: string,
    foreground_color: string
  ) => (
    <a href={value}>
      <div className="flex items-center gap-5 relative p-2 mx-4 rounded hover:scale-105 transition">
        <div
          className="rounded-full p-2"
          style={{ backgroundColor: foreground_color, color: background_color }}
        >
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          <p className="text-sm sm:text-base md:text-lg">{label}</p>
        </div>
      </div>
    </a>
  ),

  [PROFILE_COMPONENT_CATEGORY.FILE]: (
    value: string,
    type: string,
    label: string,
    background_color: string,
    foreground_color: string
  ) => (
    <a href={value}>
      <div className="flex items-center gap-5 relative p-2 mx-4 rounded hover:scale-105 transition">
        <div
          className="rounded-full p-2"
          style={{ backgroundColor: foreground_color, color: background_color }}
        >
          {typeIconMap[type as keyof typeof typeIconMap]}
        </div>
        <div>
          <p className="text-sm sm:text-base md:text-lg">{label}</p>
        </div>
      </div>
    </a>
  ),
};

export default function ProfileBodyItem({
  item,
  background_color,
  foreground_color,
}: ProfileBodyItemProps) {
  if (item.value === undefined || item.label === undefined) return null;

  return frameComponents[item.category as keyof typeof frameComponents]
    ? frameComponents[item.category as keyof typeof frameComponents](
        item.value,
        item.type,
        item.label,
        background_color,
        foreground_color
      )
    : null;
}
