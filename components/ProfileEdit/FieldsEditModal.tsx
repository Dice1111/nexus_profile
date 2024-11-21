import { Button } from "../ui/button";
import {
  FaEnvelope,
  FaLink,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaSnapchat,
  FaPinterest,
  FaPhone,
  FaWhatsapp,
  FaTelegram,
  FaVideo,
  FaMusic,
  FaPaypal,
  FaGoogle,
  FaAmazon,
  FaSpotify,
  FaYoutube,
  FaApple,
  FaDiscord,
  FaSlack,
  FaTwitch,
  FaDribbble,
  FaBehance,
} from "react-icons/fa";

export default function FieldsEditModal() {
  const data = {
    "Most Popular": [
      { label: "Email", icon: <FaEnvelope /> },
      { label: "Link", icon: <FaLink /> },
      { label: "Github", icon: <FaGithub /> },
      { label: "Website", icon: <FaLink /> },
      { label: "Linkedin", icon: <FaLinkedin /> },
      { label: "Facebook", icon: <FaFacebook /> },
      { label: "Instagram", icon: <FaInstagram /> },
    ],
    Social: [
      { label: "Twitter", icon: <FaTwitter /> },
      { label: "TikTok", icon: <FaTiktok /> },
      { label: "Snapchat", icon: <FaSnapchat /> },
      { label: "Pinterest", icon: <FaPinterest /> },
      { label: "Discord", icon: <FaDiscord /> },
      { label: "Slack", icon: <FaSlack /> },
    ],
    Communication: [
      { label: "Phone", icon: <FaPhone /> },
      { label: "WhatsApp", icon: <FaWhatsapp /> },
      { label: "Telegram", icon: <FaTelegram /> },
      { label: "Zoom", icon: <FaVideo /> },
    ],
    Conferencing: [
      { label: "Zoom", icon: <FaVideo /> },
      { label: "Google Meet", icon: <FaGoogle /> },
      { label: "Microsoft Teams", icon: <FaVideo /> },
    ],
    Payment: [
      { label: "PayPal", icon: <FaPaypal /> },
      { label: "Stripe", icon: <FaLink /> },
      { label: "Amazon Pay", icon: <FaAmazon /> },
      { label: "Apple Pay", icon: <FaApple /> },
    ],
    Video: [
      { label: "YouTube", icon: <FaYoutube /> },
      { label: "Vimeo", icon: <FaVideo /> },
      { label: "Twitch", icon: <FaTwitch /> },
    ],
    Music: [
      { label: "Spotify", icon: <FaSpotify /> },
      { label: "Apple Music", icon: <FaMusic /> },
      { label: "Amazon Music", icon: <FaAmazon /> },
    ],
    Design: [
      { label: "Dribbble", icon: <FaDribbble /> },
      { label: "Behance", icon: <FaBehance /> },
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
            {items.map(({ label, icon }) => (
              <Button
                key={label}
                className="flex items-center gap-2 border p-2 hover:bg-secondary hover:text-secondary-foreground rounded-md shadow-md"
              >
                {icon}
                {label}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
