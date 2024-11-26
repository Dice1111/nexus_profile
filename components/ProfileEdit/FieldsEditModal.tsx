import { PROFILE_COMPONENT_TYPE } from "@/lib/type";
import { Button } from "../ui/button";
import { typeIconMap } from "@/lib/icon";

export default function FieldsEditModal() {
  const data = {
    "General Use": [
      { label: "Email", type: PROFILE_COMPONENT_TYPE.EMAIL },
      { label: "Link", type: PROFILE_COMPONENT_TYPE.LINK },
      { label: "Github", type: PROFILE_COMPONENT_TYPE.GITHUB },
      { label: "Website", type: PROFILE_COMPONENT_TYPE.LINK },
      { label: "Linkedin", type: PROFILE_COMPONENT_TYPE.LINKEDIN },
      { label: "Facebook", type: PROFILE_COMPONENT_TYPE.FACEBOOK },
      { label: "Instagram", type: PROFILE_COMPONENT_TYPE.INSTAGRAM },
      { label: "Map", type: PROFILE_COMPONENT_TYPE.MAP },
    ],
    Social: [
      { label: "Twitter", type: PROFILE_COMPONENT_TYPE.TWITTER },
      { label: "TikTok", type: PROFILE_COMPONENT_TYPE.TIKTOK },
      { label: "Snapchat", type: PROFILE_COMPONENT_TYPE.SNAPCHAT },
      { label: "Pinterest", type: PROFILE_COMPONENT_TYPE.PINTEREST },
      { label: "Discord", type: PROFILE_COMPONENT_TYPE.DISCORD },
      { label: "Slack", type: PROFILE_COMPONENT_TYPE.SLACK },
      { label: "Facebook", type: PROFILE_COMPONENT_TYPE.FACEBOOK },
      { label: "Instagram", type: PROFILE_COMPONENT_TYPE.INSTAGRAM },
    ],
    Communication: [
      { label: "Email", type: PROFILE_COMPONENT_TYPE.EMAIL },
      { label: "Phone", type: PROFILE_COMPONENT_TYPE.PHONE },
      { label: "WhatsApp", type: PROFILE_COMPONENT_TYPE.WHATSAPP },
      { label: "Telegram", type: PROFILE_COMPONENT_TYPE.TELEGRAM },
      { label: "Zoom", type: PROFILE_COMPONENT_TYPE.VIDEO },
    ],
    Conferencing: [
      { label: "Zoom", type: PROFILE_COMPONENT_TYPE.VIDEO },
      { label: "Google Meet", type: PROFILE_COMPONENT_TYPE.GOOGLE_MEET },
      {
        label: "Microsoft Teams",
        type: PROFILE_COMPONENT_TYPE.MICROSOFT_TEAMS,
      },
    ],
    Payment: [
      { label: "PayPal", type: PROFILE_COMPONENT_TYPE.PAYPAL },
      { label: "Stripe", type: PROFILE_COMPONENT_TYPE.STRIPE },
      { label: "Amazon Pay", type: PROFILE_COMPONENT_TYPE.AMAZON_PAY },
      { label: "Apple Pay", type: PROFILE_COMPONENT_TYPE.APPLE_PAY },
    ],
    Video: [
      { label: "YouTube", type: PROFILE_COMPONENT_TYPE.YOUTUBE },
      { label: "Vimeo", type: PROFILE_COMPONENT_TYPE.VIDEO },
      { label: "Twitch", type: PROFILE_COMPONENT_TYPE.TWITCH },
    ],
    Music: [
      { label: "Spotify", type: PROFILE_COMPONENT_TYPE.SPOTIFY },
      { label: "Apple Music", type: PROFILE_COMPONENT_TYPE.APPLE_MUSIC },
      { label: "Amazon Music", type: PROFILE_COMPONENT_TYPE.AMAZON_MUSIC },
    ],
    Design: [
      { label: "Dribbble", type: PROFILE_COMPONENT_TYPE.DRIBBBLE },
      { label: "Behance", type: PROFILE_COMPONENT_TYPE.BEHANCE },
    ],
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title */}
      <h2 className="text-2xl font-thin">Fields</h2>

      {Object.entries(data).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-lg font-medium">{category}</h2>
          <div className="flex flex-wrap gap-2">
            {items.map(({ label, type }) => (
              <Button
                key={label}
                className="flex items-center gap-2 border bg-primary text-primary-foreground p-2 hover:bg-secondary hover:text-secondary-foreground rounded-md shadow-md"
              >
                {typeIconMap[type as keyof typeof typeIconMap]}
                {label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
