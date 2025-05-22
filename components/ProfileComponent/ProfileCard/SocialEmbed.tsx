"use client";

import { useEffect } from "react";

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

// Extend global Window for social SDKs
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: () => void;
      };
    };
    FB?: {
      XFBML: {
        parse: () => void;
      };
    };
    IN?: {
      parse: () => void;
    };
  }
}

const SocialEmbed = ({ type, url }: SocialEmbedProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (
      type === "twitter" &&
      typeof window !== "undefined" &&
      window.twttr?.widgets
    ) {
      window.twttr.widgets.load();
    }

    if (
      type === "facebook" &&
      typeof window !== "undefined" &&
      window.FB?.XFBML
    ) {
      window.FB.XFBML.parse();
    }

    if (
      type === "linkedin" &&
      typeof window !== "undefined" &&
      window.IN?.parse
    ) {
      window.IN.parse();
    }
  }, [type, url]);

  function extractInstagramInfo(url: string) {
    const regex = /instagram\.com\/(p|reel|tv)\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    if (!match) return null;
    return { type: match[1], id: match[2] };
  }

  const extractTikTokId = (url: string) => {
    const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/);
    return match ? match[1] : null;
  };

  const extractYouTubeId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  switch (type) {
    case "instagram": {
      const info = extractInstagramInfo(url);
      if (!info) return null;
      return (
        <iframe
          src={`https://www.instagram.com/${info.type}/${info.id}/embed`}
          className="rounded-lg"
          width="100%"
          height="600"
          allowFullScreen
        ></iframe>
      );
    }

    case "twitter":
      return (
        <div className="bg-white rounded-lg w-full">
          <blockquote className="twitter-tweet">
            <a href={url}></a>
          </blockquote>
        </div>
      );

    case "tiktok": {
      const videoId = extractTikTokId(url);
      if (!videoId) return null;
      return (
        <iframe
          height="600"
          width="100%"
          className="rounded-lg"
          src={`https://www.tiktok.com/player/v1/${videoId}?&music_info=1&description=1`}
          allow="fullscreen"
          title="test"
        ></iframe>
      );
    }

    case "youtube": {
      const videoId = extractYouTubeId(url);
      if (!videoId) return null;
      return (
        <iframe
          width="100%"
          height="400"
          className="rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      );
    }

    case "facebook":
      const isVideo = /\/video\//.test(url);
      return (
        <div
          className={`fb-post ${
            isVideo ? "fb-video" : "fb-post"
          } w-full rounded-lg overflow-hidden bg-white`}
          data-href={url}
          data-width="450"
          show-text="true"
        ></div>
      );

    case "linkedin":
      return (
        <iframe
          src={url}
          className="rounded-lg"
          width="100%"
          height="400"
          title="Embedded post"
        ></iframe>
      );

    default:
      return null;
  }
};

export default SocialEmbed;
