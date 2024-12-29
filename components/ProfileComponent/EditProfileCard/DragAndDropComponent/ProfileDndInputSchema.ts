import { z } from "zod";

export const profileDndInputSchema = z.discriminatedUnion("type", [
  //..................GENERAL..................
  // Image
  z.object({
  id: z.string().min(1, "ID cannot be empty"),
  card_id: z.string().min(1, "Card ID cannot be empty"),
  type: z.literal("img"),
  category: z.literal("img"),
  display_text: z.string().optional(),
  value: z.string().min(1, "Value cannot be empty"), // Ensures `value` is not null or empty
  }),
  // Text
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("text"),
    category: z.literal("text"),
    display_text: z.string().optional(),
    value: z.string().min(1, "Text cannot be empty"),
  }),
  // Email
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("email"),
    category: z.literal("mail"),
    display_text: z.string().optional(),
    value: z.string().email("Invalid email address").min(1, "Value cannot be empty"),
  }),
  // Link
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("link"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z.string().url("Invalid URL").min(1, "Value cannot be empty"),
  }),
    // Map
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("map"),
    category: z.literal("map"),
    display_text: z.string().optional(),
    value: z.string().min(1, "Address cannot be empty"),
  }),

  //>.................SOCIAL..................
  // GitHub
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("github"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid GitHub URL")
      .refine((url) => /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "GitHub URL must be in the format: https://github.com/{username}",
      }),
  }),

  // LinkedIn
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("linkedin"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid LinkedIn URL")
      .refine((url) => /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "LinkedIn URL must be in the format: https://www.linkedin.com/in/{username}",
      }),
  }),
  // Facebook
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("facebook"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Facebook URL")
      .refine((url) => /^https:\/\/www\.facebook\.com\/[a-zA-Z0-9.]+$/.test(url), {
        message: "Facebook URL must be in the format: https://www.facebook.com/{username}",
      }),
  }),
  // Instagram
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("instagram"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Instagram URL")
      .refine((url) => /^https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+$/.test(url), {
        message: "Instagram URL must be in the format: https://www.instagram.com/{username}",
      }),
  }),
  
  // Twitter
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("twitter"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Twitter URL")
      .refine((url) => /^https:\/\/twitter\.com\/[a-zA-Z0-9_]+$/.test(url), {
        message: "Twitter URL must be in the format: https://twitter.com/{username}",
      }),
  }),
  // TikTok
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("tiktok"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid TikTok URL")
      .refine((url) => /^https:\/\/www\.tiktok\.com\/@.+/.test(url), {
        message: "TikTok URL must be in the format: https://www.tiktok.com/@{username}",
      }),
  }),
  // SnapChat
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("snapchat"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z.string().url("Invalid Snapchat URL").min(1, "Value cannot be empty"),
  }),
  //Pinterest
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("pinterest"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Pinterest URL")
      .refine(
        (url) =>
          /^https:\/\/(www\.)?pinterest\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(url),
        {
          message: "Pinterest URL must be in the format: https://www.pinterest.com/{username} or https://www.pinterest.com/{username}/{boardName}",
        }
      ),
  }),
  // Discord
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("discord"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .refine((handle) => /^.{3,32}#[0-9]{4}$/.test(handle), {
        message:
          "Discord handle must be in the format: username#1234, where 'username' is 3-32 characters and the discriminator is 4 digits.",
      }),
  }),


  //.............COMMUNICATION..................
  // Phone
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("phone"),
    category: z.literal("phone"),
    display_text: z.string().optional(),
    value: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  }),

 
  // WhatsApp
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("whatsapp"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .regex(
        /^https:\/\/wa\.me\/\d{1,15}$/,
        "WhatsApp number must be in the format: https://wa.me/{number}"
      ),
  }),

  // Telegram
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("telegram"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .regex(
        /^https:\/\/t\.me\/[a-zA-Z0-9_]{1,32}$/,
        "Telegram username must be in the format: https://t.me/{username} (1-32 characters, alphanumeric or underscores)"
      ),
  }),
  //...........CONFERENCING..................
// Zoom
z.object({
  id: z.string().min(1, "ID cannot be empty"),
  card_id: z.string().min(1, "Card ID cannot be empty"),
  type: z.literal("zoom"),
  category: z.literal("link"),
  display_text: z.string().optional(),
  value: z
    .string()
    .url("Invalid Zoom meeting link")
    .refine(
      (url) => /^https:\/\/zoom\.us\/j\/[0-9]+$/.test(url),
      {
        message: "Zoom meeting link must be in the format: https://zoom.us/j/{meetingId}",
      }
    ),
}),

  // Google Meet
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("google_meet"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Google Meet link")
      .refine((url) => /^https:\/\/meet\.google\.com\/[a-z0-9]+(-[a-z0-9]+){2}$/.test(url), {
        message: "Google Meet link must be in the format: https://meet.google.com/{code}",
      }),
  }),

  // Microsoft Teams
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("microsoft_teams"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Microsoft Teams meeting link")
      .refine((url) => /^https:\/\/teams\.microsoft\.com\/l\/meetup-join\/.+$/.test(url), {
        message: "Microsoft Teams link must be in the format: https://teams.microsoft.com/l/meetup-join/{parameters}",
      }),
  }),

  //...............PAYMENTS....................
  // PayPal
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("paypal"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid PayPal link")
      .refine((url) => /^https:\/\/www\.paypal\.com\/.+/.test(url), {
        message: "PayPal link must be in the format: https://www.paypal.com/{resource}",
      }),
  }),

  // Amazon Pay
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("amazon_pay"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Amazon Pay link")
      .refine((url) => /^https:\/\/pay\.amazon\.com\/.+/.test(url), {
        message: "Amazon Pay link must be in the format: https://pay.amazon.com/{resource}",
      }),
  }),

  // Apple Pay
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("apple_pay"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Apple Pay link")
      .refine((url) => /^https:\/\/www\.apple\.com\/apple-pay\/.+/.test(url), {
        message: "Apple Pay link must be in the format: https://www.apple.com/apple-pay/{resource}",
      }),
  }),

  //.............VIDEOS.......................
  // YouTube
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("youtube"),
    category: z.literal("video"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid YouTube URL")
      .refine(
        (url) =>
          /^https:\/\/(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]+$/.test(url),
        {
          message:
            "YouTube URL must be in the format: https://www.youtube.com/watch?v={videoId} or https://youtu.be/{videoId}",
        }
      ),
  }),

  // Twitch
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("twitch"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Twitch URL")
      .refine((url) => /^https:\/\/www\.twitch\.tv\/[a-zA-Z0-9_]+$/.test(url), {
        message: "Twitch URL must be in the format: https://www.twitch.tv/{channelName}",
      }),
  }),

  //...............MUSIC......................
  // Spotify
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("spotify"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Spotify URL")
      .refine((url) => /^https:\/\/open\.spotify\.com\/.+/.test(url), {
        message: "Spotify URL must be in the format: https://open.spotify.com/{resource}",
      }),
  }),

  // Apple Music
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("apple_music"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Apple Music URL")
      .refine((url) => /^https:\/\/music\.apple\.com\/.+/.test(url), {
        message: "Apple Music URL must be in the format: https://music.apple.com/{resource}",
      }),
  }),

  // Amazon Music
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("amazon_music"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Amazon Music URL")
      .refine((url) => /^https:\/\/music\.amazon\.com\/.+/.test(url), {
        message: "Amazon Music URL must be in the format: https://music.amazon.com/{resource}",
      }),
  }),

  //...................DESIGN.................
  // Dribbble
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("dribbble"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Dribbble URL")
      .refine((url) => /^https:\/\/dribbble\.com\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "Dribbble URL must be in the format: https://dribbble.com/{username}",
      }),
  }),
  // Behance
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal("behance"),
    category: z.literal("link"),
    display_text: z.string().optional(),
    value: z
      .string()
      .url("Invalid Behance URL")
      .refine((url) => /^https:\/\/www\.behance\.net\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "Behance URL must be in the format: https://www.behance.net/{username}",
      }),
  }),


]);

export type ProfileDndComponentSchemaType = z.infer<typeof profileDndInputSchema>;

