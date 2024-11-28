import {
  ProfileComponent,
  PROFILE_COMPONENT_TYPE,
  PROFILE_COMPONENT_CATEGORY,
  ProfileCard,
} from "@/lib/type";

// Fetch profile components by card ID
export async function fetchUserProfileComponentsData(
  id: number
): Promise<ProfileComponent[]> {
  return profileComponents.filter((component) => component.card_id === id);
}

// Fetch a profile card by card ID
export async function fetchUserProfileCardData(
  id: number
): Promise<ProfileCard | null> {
  const card = profileCard.find((card) => card.card_id === id);
  return card || null; // Return null if no card is found
}

const profileComponents: ProfileComponent[] = [
  {
    id: 1,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.IMAGE,
    category: PROFILE_COMPONENT_CATEGORY.IMAGE,
    display_text:"profile image",
    value: "/image/profile.jpg",
  },
  {
    id: 2,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    display_text:"",
    value: "John Doe",
  },
  {
    id: 3,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    display_text:"",
    value: "Web Developer",
  },
  {
    id: 4,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    display_text:"",
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis labore, beatae expedita, odio dolor minus totam doloremque incidunt explicabo omnis asperiores recusandae atque suscipit repellendus, voluptatem in ducimus modi sint!",
  },
  {
    id: 5,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.PHONE,
    category: PROFILE_COMPONENT_CATEGORY.PHONE,
    display_text:"Home",
    value: "58385936",
  },
  {
    id: 6,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.EMAIL,
    category: PROFILE_COMPONENT_CATEGORY.MAIL,
    display_text:"gmail",
    value: "apple@gmail.com",
  },
  {
    id: 7,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.LINK,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    display_text:"Check out my website",
    value: "www.apple@gmail.com",
  },
  {
    id: 8,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.VIDEO,
    category: PROFILE_COMPONENT_CATEGORY.VIDEO,
    display_text:"video",
    value: "https://www.youtube.com/embed/ekr2nIex040?si=ip9BjeIhkp30ejcS",
  },
  {
    id: 9,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.MAP,
    category: PROFILE_COMPONENT_CATEGORY.MAP,
    display_text:"map",
    value:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5641.033400395882!2d103.85507134698486!3d1.2862602131934748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ee4cc09203%3A0x26c9afefa555dd7!2sMarina%20Bay%20Sands%20Singapore!5e0!3m2!1sen!2ssg!4v1732018272377!5m2!1sen!2ssg",
  },
  {
    id: 10,
    card_id: 1,
    type: PROFILE_COMPONENT_TYPE.DISCORD,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    display_text:"my discord",
    value: "https://discord.com",
  },
];

const profileCard: ProfileCard[] = [
  {
    card_id: 1,
    icon_color: "#050505",
    layout: "layout_one",
    wave_type: "wave_one",
    wave_color: "#050505",
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
    card_id: 2,
    icon_color: "#FF5733",
    layout: "layout_two",
    wave_type: "wave_two",
    wave_color: "#FF5733",
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
    card_id: 3,
    icon_color: "#33FF57",
    layout: "layout_three",
    wave_type: "wave_three",
    wave_color: "#33FF57",
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
];
