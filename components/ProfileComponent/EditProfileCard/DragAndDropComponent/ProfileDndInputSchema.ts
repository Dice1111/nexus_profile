import { PROFILE_COMPONENT_CATEGORY, PROFILE_COMPONENT_TYPE } from "@/types/enums";
import { z } from "zod";

export const profileDndInputSchema = z.discriminatedUnion("type", [
  // Image
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.IMAGE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.IMAGE),
    display_text: z.string().optional(),
    value: z.string().min(1, "Value cannot be empty"),
  }),
  
  // Heading Text
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.HEADING),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.TEXT),
    display_text: z.string().optional(),
    value: z.string().min(1, "Text cannot be empty"),
  }),

  // Paragraph Text
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.PARAGRAPH),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.TEXT),
    display_text: z.string().optional(),
    value: z.string().min(1, "Text cannot be empty"),
  }),

  // Email
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.EMAIL),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.MAIL),
    display_text: z.string().optional(),
    value: z.string().email("Invalid email address").min(1, "Value cannot be empty"),
  }),

  // Link
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.LINK),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string().url("Invalid URL").min(1, "Value cannot be empty"),
  }),

  // Map
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.MAP),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.MAP),
    display_text: z.string().optional(),
    value: z.string().min(1, "Address cannot be empty"),
  }),

  // GitHub
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.GITHUB),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid GitHub URL")
      .refine((url) => /^https:\/\/github\.com\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "GitHub URL must be in the format: https://github.com/{username}",
      }),
  }),

  // LinkedIn
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.LINKEDIN),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid LinkedIn URL")
      .refine((url) => /^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "LinkedIn URL must be in the format: https://www.linkedin.com/in/{username}",
      }),
  }),

  // Facebook
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.FACEBOOK),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Facebook URL")
      .refine((url) => /^https:\/\/www\.facebook\.com\/[a-zA-Z0-9.]+$/.test(url), {
        message: "Facebook URL must be in the format: https://www.facebook.com/{username}",
      }),
  }),

  // Instagram
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.INSTAGRAM),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Instagram URL")
      .refine((url) => /^https:\/\/www\.instagram\.com\/[a-zA-Z0-9._]+$/.test(url), {
        message: "Instagram URL must be in the format: https://www.instagram.com/{username}",
      }),
  }),

  // Twitter
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.TWITTER),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Twitter URL")
      .refine((url) => /^https:\/\/twitter\.com\/[a-zA-Z0-9_]+$/.test(url), {
        message: "Twitter URL must be in the format: https://twitter.com/{username}",
      }),
  }),

  // TikTok
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.TIKTOK),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid TikTok URL")
      .refine((url) => /^https:\/\/www\.tiktok\.com\/@.+/.test(url), {
        message: "TikTok URL must be in the format: https://www.tiktok.com/@{username}",
      }),
  }),

  // SnapChat
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.SNAPCHAT),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string().url("Invalid Snapchat URL").min(1, "Value cannot be empty"),
  }),

  // Pinterest
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.PINTEREST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Pinterest URL")
      .refine((url) => /^https:\/\/(www\.)?pinterest\.com\/[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/.test(url), {
        message: "Pinterest URL must be in the format: https://www.pinterest.com/{username} or https://www.pinterest.com/{username}/{boardName}",
      }),
  }),

  // Discord
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.DISCORD),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string().refine((handle) => /^.{3,32}#[0-9]{4}$/.test(handle), {
      message: "Discord handle must be in the format: username#1234, where 'username' is 3-32 characters and the discriminator is 4 digits.",
    }),
  }),

  // Dribbble
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.DRIBBBLE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Dribbble URL")
      .refine((url) => /^https:\/\/dribbble\.com\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "Dribbble URL must be in the format: https://dribbble.com/{username}",
      }),
  }),

  // Behance
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.BEHANCE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Behance URL")
      .refine((url) => /^https:\/\/www\.behance\.net\/[a-zA-Z0-9_-]+$/.test(url), {
        message: "Behance URL must be in the format: https://www.behance.net/{username}",
      }),
  }),

  // YouTube
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.YOUTUBE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid YouTube URL")
      .refine((url) => /^https:\/\/(www\.)?youtube\.com\/(@[\w-]+|channel\/[a-zA-Z0-9_-]+)$/.test(url), {
        message: "YouTube URL must be in the format: https://www.youtube.com/@username or https://www.youtube.com/channel/{channelId}",
      }),
  }),

  // Phone
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.PHONE),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.PHONE),
    display_text: z.string().optional(),
    value: z.string().regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  }),

  // WhatsApp
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.WHATSAPP),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .regex(/^https:\/\/wa\.me\/\d{1,15}$/, "WhatsApp number must be in the format: https://wa.me/{number}"),
  }),

  // Telegram
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.TELEGRAM),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .regex(/^https:\/\/t\.me\/[a-zA-Z0-9_]{1,32}$/, 
        "Telegram username must be in the format: https://t.me/{username} (1-32 characters, alphanumeric or underscores)"),
  }),

  // Zoom
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.ZOOM),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Zoom meeting link")
      .refine((url) => /^https:\/\/zoom\.us\/j\/[0-9]+$/.test(url), {
        message: "Zoom meeting link must be in the format: https://zoom.us/j/{meetingId}",
      }),
  }),

  // Google Meet
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.GOOGLE_MEET),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Google Meet link")
      .refine((url) => /^https:\/\/meet\.google\.com\/[a-z0-9]+(-[a-z0-9]+){2}$/.test(url), {
        message: "Google Meet link must be in the format: https://meet.google.com/{code}",
      }),
  }),

  // Microsoft Teams
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.MICROSOFT_TEAMS),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Microsoft Teams meeting link")
      .refine((url) => /^https:\/\/teams\.microsoft\.com\/l\/meetup-join\/.+$/.test(url), {
        message: "Microsoft Teams link must be in the format: https://teams.microsoft.com/l/meetup-join/{parameters}",
      }),
  }),

  // PayPal
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.PAYPAL),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid PayPal link")
      .refine((url) => /^https:\/\/www\.paypal\.com\/.+/.test(url), {
        message: "PayPal link must be in the format: https://www.paypal.com/{resource}",
      }),
  }),

  // Amazon Pay
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.AMAZON_PAY),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Amazon Pay link")
      .refine((url) => /^https:\/\/pay\.amazon\.com\/.+/.test(url), {
        message: "Amazon Pay link must be in the format: https://pay.amazon.com/{resource}",
      }),
  }),

  // Apple Pay
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.APPLE_PAY),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Apple Pay link")
      .refine((url) => /^https:\/\/www\.apple\.com\/apple-pay\/.+/.test(url), {
        message: "Apple Pay link must be in the format: https://www.apple.com/apple-pay/{resource}",
      }),
  }),

  // Twitch
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.TWITCH),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.LINK),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Twitch URL")
      .refine((url) => /^https:\/\/www\.twitch\.tv\/[a-zA-Z0-9_]+$/.test(url), {
        message: "Twitch URL must be in the format: https://www.twitch.tv/{channelName}",
      }),
  }),

  // Facebook Post
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.FACEBOOK_POST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Facebook URL")
      .refine((url) => /^https:\/\/www\.facebook\.com\/[a-zA-Z0-9./-]+\/posts\/[a-zA-Z0-9]+(\/)?$/.test(url) || 
        /^https:\/\/www\.facebook\.com\/[a-zA-Z0-9./-]+\/posts\/pfbid[a-zA-Z0-9]+(\/)?$/.test(url), {
        message: "Facebook URL must be in the format: https://www.facebook.com/{pageName}/posts/{postId} or include a valid pfbid.",
      }),
  }),

  // Instagram Post
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.INSTAGRAM_POST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Instagram URL")
      .refine((url) => /^https:\/\/www\.instagram\.com\/p\/[a-zA-Z0-9_-]+\/?(\?.*)?$/.test(url), {
        message: "Instagram URL must be in the format: https://www.instagram.com/p/{postId}/, optionally including query parameters.",
      }),
  }),

  // Twitter Post
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.TWITTER_POST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid Twitter URL")
      .refine((url) => /^https:\/\/twitter\.com\/[a-zA-Z0-9_]+\/status\/[0-9]+$/.test(url), {
        message: "Twitter URL must be in the format: https://twitter.com/{username}/status/{tweetId}",
      }),
  }),

  // TikTok Post
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.TIKTOK_POST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid TikTok URL")
      .refine((url) => /^https:\/\/www\.tiktok\.com\/@[a-zA-Z0-9_.-]+\/video\/[0-9]+(\?.*)?$/.test(url), {
        message: "TikTok URL must be in the format: https://www.tiktok.com/@{username}/video/{videoId}",
      }),
  }),

  // LinkedIn Post
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.LINKEDIN_POST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid LinkedIn URL")
      .refine((url) => /^https:\/\/www\.linkedin\.com\/embed\/feed\/update\/urn:li:share:[0-9]+$/.test(url), {
        message: "LinkedIn URL must be in the format: https://www.linkedin.com/embed/feed/update/urn:li:share:{postId}",
      }),
  }),

  // YouTube Post
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.YOUTUBE_POST),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.SOCIAL_EMBED),
    display_text: z.string().optional(),
    value: z.string()
      .url("Invalid YouTube URL")
      .refine((url) => /^https:\/\/www\.youtube\.com\/watch\?v=[a-zA-Z0-9_-]+$/.test(url), {
        message: "YouTube URL must be in the format: https://www.youtube.com/watch?v={videoId}",
      }),
  }),

  // Microsoft Word
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.MICROSOFT_WORD),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.FILE),
    display_text: z.string().optional(),
    value: z.string().min(1, "Value cannot be empty"),
  }),

  // PDF
  z.object({
    id: z.string().min(1, "ID cannot be empty"),
    card_id: z.string().min(1, "Card ID cannot be empty"),
    type: z.literal(PROFILE_COMPONENT_TYPE.PDF),
    category: z.literal(PROFILE_COMPONENT_CATEGORY.FILE),
    display_text: z.string().optional(),
    value: z.string().min(1, "Value cannot be empty"),
  }),
]);

export type ProfileDndComponentSchemaType = z.infer<typeof profileDndInputSchema>;