"use client";
import { useState } from "react";
import { Button } from "../ui/button";

const ShareButton = ({ url }: { url: string }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          url: url,
        });
      } catch (error) {
        console.error("Sharing failed:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      className="text-xl bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
      onClick={handleShare}
    >
      {copied ? "Copied!" : "Share Link"}
    </Button>
  );
};

export default ShareButton;
