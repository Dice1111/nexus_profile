"use client";

import {
  InstagramEmbed,
  TikTokEmbed,
  YouTubeEmbed,
  FacebookEmbed,
  LinkedInEmbed,
  XEmbed,
} from "react-social-media-embed";

type SocialEmbedProps = {
  type:
    | "instagram"
    | "twitter"
    | "tiktok"
    | "youtube"
    | "facebook"
    | "linkedin";
  url: string;
};

const SocialEmbed = ({ type, url }: SocialEmbedProps) => {
  const commonProps = { url, width: "100%" };

  switch (type) {
    case "instagram":
      return <InstagramEmbed {...commonProps} />;
    case "twitter":
      return <XEmbed {...commonProps} />;
    case "tiktok":
      return <TikTokEmbed {...commonProps} />;
    case "youtube":
      return <YouTubeEmbed {...commonProps} />;
    case "facebook":
      return <FacebookEmbed {...commonProps} />;
    case "linkedin":
      return <LinkedInEmbed {...commonProps} />;
    default:
      return null;
  }
};

export default SocialEmbed;
