import { ProfileCard, ProfileDndComponent } from "@/lib/type";

// Fetch profile components by card ID
export async function fetchUserProfileDndComponentsData(
  card_id: string
): Promise<ProfileDndComponent[]> {
  return profileDndComponents.filter((component) => component.card_id === card_id);
}

// Fetch a profile card by card ID
export async function fetchUserProfileCardData(
  card_id: string
): Promise<ProfileCard | null> {
  const card = profileCard.find((card) => card.card_id === card_id);
  return card || null; // Return null if no card is found
}

const profileDndComponents: ProfileDndComponent[] = [
  // Email
  {
    id: "103",
    card_id: "1",
    type: "email",
    category: "mail",
    display_text: "Work Email",
    value: "john.doe@example.com",
  },
  // Link
  {
    id: "104",
    card_id: "1",
    type: "link",
    category: "link",
    display_text: "Personal Website",
    value: "https://johndoe.com",
  },

  // Phone
  {
    id: "106",
    card_id: "1",
    type: "phone",
    category: "phone",
    display_text: "Mobile",
    value: "6594832945",
  },
  // WhatsApp
  {
    id: "107",
    card_id: "1",
    type: "whatsapp",
    category: "link",
    display_text: "WhatsApp Number",
    value: "https://wa.me/6594832945",
  },
  // Telegram
  {
    id: "108",
    card_id: "1",
    type: "telegram",
    category: "link",
    display_text: "My Telegram",
    value: "https://t.me/nayaunglwin1",
  },
  // Text
  {
    id: "102",
    card_id: "1",
    type: "text",
    category: "text",
    display_text: "Name",
    value: "My Best Image!",
  },
  // Image
  {
    id: "101",
    card_id: "1",
    type: "img",
    category: "img",
    display_text: "",
    value: "/image/profile.jpg",
  },

  {
    id: "200",
    card_id: "1",
    type: "text",
    category: "text",
    display_text: "Name",
    value: "My Address",
  },

  // Map
  {
    id: "105",
    card_id: "1",
    type: "map",
    category: "map",
    display_text: "Address",
    value: "Central Park, New York",
  },
  // YouTube
  {
    id: "109",
    card_id: "1",
    type: "youtube",
    category: "video",
    display_text: "YouTube Channel",
    value: "https://www.youtube.com/watch?v=ekr2nIex040",
  },

  {
    id: "201",
    card_id: "1",
    type: "text",
    category: "text",
    display_text: "Name",
    value: "My Social Media Links",
  },
  // Discord
  {
    id: "110",
    card_id: "1",
    type: "discord",
    category: "link",
    display_text: "Discord Account",
    value: "dice#3040",
  },
  // GitHub
  {
    id: "111",
    card_id: "1",
    type: "github",
    category: "link",
    display_text: "GitHub Profile",
    value: "https://github.com/johndoe",
  },
  // LinkedIn
  {
    id: "112",
    card_id: "1",
    type: "linkedin",
    category: "link",
    display_text: "LinkedIn Profile",
    value: "https://www.linkedin.com/in/johndoe",
  },
  // Facebook
  {
    id: "113",
    card_id: "1",
    type: "facebook",
    category: "link",
    display_text: "Facebook Page",
    value: "https://www.facebook.com/johndoe",
  },
  // Instagram
  {
    id: "114",
    card_id: "1",
    type: "instagram",
    category: "link",
    display_text: "Instagram Profile",
    value: "https://www.instagram.com/johndoe",
  },
  // Twitter
  {
    id: "115",
    card_id: "1",
    type: "twitter",
    category: "link",
    display_text: "Twitter Profile",
    value: "https://twitter.com/johndoe",
  },
  // TikTok
  {
    id: "116",
    card_id: "1",
    type: "tiktok",
    category: "link",
    display_text: "TikTok Profile",
    value: "https://www.tiktok.com/@johndoe",
  },
  // Pinterest
  {
    id: "117",
    card_id: "1",
    type: "pinterest",
    category: "link",
    display_text: "Pinterest Board",
    value: "https://www.pinterest.com/johndoe/myboard",
  },
  // Spotify
  {
    id: "118",
    card_id: "1",
    type: "spotify",
    category: "link",
    display_text: "Spotify Playlist",
    value: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M",
  },
  // PayPal
  {
    id: "119",
    card_id: "1",
    type: "paypal",
    category: "link",
    display_text: "PayPal Link",
    value: "https://www.paypal.com/paypalme/johndoe",
  },
  // Zoom
  {
    id: "120",
    card_id: "1",
    type: "zoom",
    category: "link",
    display_text: "Zoom Meeting",
    value: "https://zoom.us/j/1234567890",
  },
  // Google Meet
  {
    id: "121",
    card_id: "1",
    type: "google_meet",
    category: "link",
    display_text: "Google Meet",
    value: "https://meet.google.com/abc-defg-hij",
  },
  // Microsoft Teams
  {
    id: "122",
    card_id: "1",
    type: "microsoft_teams",
    category: "link",
    display_text: "Microsoft Teams Meeting",
    value: "https://teams.microsoft.com/l/meetup-join/abc123",
  },
  // Dribbble
  {
    id: "123",
    card_id: "1",
    type: "dribbble",
    category: "link",
    display_text: "Dribbble Profile",
    value: "https://dribbble.com/johndoe",
  },
  // Behance
  {
    id: "124",
    card_id: "1",
    type: "behance",
    category: "link",
    display_text: "Behance Portfolio",
    value: "https://www.behance.net/johndoe",
  },
];

const profileCard: ProfileCard[] = [
  {
    card_id: "1",
    user_id: "1",
    foreground_color: "#E6E6FA",
    background_color: "#050505",
    wave_color: "#FF6347",
    layout: "classic",
    wave_type: "wave_one",
    image: "/image/profile.jpg",
    logo_icon: "/image/profile.jpg",
    prefix: "Mr.",
    first_name: "John",
    middle_name: "Arthur",
    last_name: "Doe",
    suffix: "Jr.",
    quote: "Time and Tide wait for no man.",
    preferred_name: "John Doe",
    pronouns: "he/him",
    title: "Dr.",
    occupation: "Web Developer",
    company: "Google",
    message: "Hello world!",
  },
  {
    card_id: "2",
    user_id: "1",
    foreground_color: "#050505",
    background_color: "#ffffff",
    wave_color: "#050505",
    layout: "modern",
    wave_type: "wave_two",
    image: "/image/profile2.jpg",
    logo_icon: "/image/logo2.jpg",
    prefix: "Ms.",
    first_name: "Jane",
    middle_name: "Elizabeth",
    last_name: "Smith",
    suffix: "",
    quote: "Dream big, work hard.",
    preferred_name: "Jane Smith",
    pronouns: "she/her",
    title: "Ms.",
    occupation: "Graphic Designer",
    company: "Adobe",
    message: "Let's create amazing designs!",
  },
  {
    card_id: "3",
    user_id: "1",
    foreground_color: "#050505",
    background_color: "#ffffff",
    wave_color: "#050505",
    layout: "layout_three",
    wave_type: "wave_three",
    image: "/image/profile3.jpg",
    logo_icon: "/image/logo3.jpg",
    prefix: "",
    first_name: "Alex",
    middle_name: "",
    last_name: "Johnson",
    suffix: "",
    quote: "Innovation is key.",
    preferred_name: "Alex Johnson",
    pronouns: "they/them",
    title: "Engineer",
    occupation: "Software Engineer",
    company: "Tesla",
    message: "Driving the future of tech!",
  },


  //INITIAL DATA
  {
    card_id: "4",
    user_id: "4",
    foreground_color: "#E6E6FA",
    background_color: "#050505",
    wave_color: "#050505",
    layout: "classic",
    wave_type: "wave_one",
    image: "",
    logo_icon: "",
    prefix: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    suffix: "",
    quote: "",
    preferred_name: "",
    pronouns: "",
    title: "",
    occupation: "",
    company: "",
    message: "",
  },
];
