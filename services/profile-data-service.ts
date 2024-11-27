import {
  ProfileComponent,
  PROFILE_COMPONENT_TYPE,
  PROFILE_COMPONENT_CATEGORY,
  ProfileCard,
} from "@/lib/type";

export async function fetchProfileComponentsData(): Promise<
  ProfileComponent[]
> {
  return profileComponents;
}

export async function fetchProfileCardData(): Promise<ProfileCard> {
  return profileCard;
}

const profileComponents: ProfileComponent[] = [
  // {
  //   id: 1,
  //   type: PROFILE_COMPONENT_TYPE.IMAGE,
  //   category: PROFILE_COMPONENT_CATEGORY.IMAGE,
  //   value: "/image/profile.jpg",
  // },

  {
    id: 2,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    value: "John Doe",
  },
  {
    id: 3,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    value: "Web Developer",
  },
  {
    id: 4,
    type: PROFILE_COMPONENT_TYPE.TEXT,
    category: PROFILE_COMPONENT_CATEGORY.TEXT,
    value:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis labore, beatae expedita, odio dolor minus totam doloremque incidunt explicabo omnis asperiores recusandae atque suscipit repellendus, voluptatem in ducimus modi sint!",
  },
  {
    id: 5,
    type: PROFILE_COMPONENT_TYPE.PHONE,
    category: PROFILE_COMPONENT_CATEGORY.PHONE,
    value: "58385936",
  },
  {
    id: 6,
    type: PROFILE_COMPONENT_TYPE.EMAIL,
    category: PROFILE_COMPONENT_CATEGORY.MAIL,
    value: "apple@gmail.com",
  },
  {
    id: 7,
    type: PROFILE_COMPONENT_TYPE.LINK,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    value: "www.apple@gmail.com",
  },
  {
    id: 8,
    type: PROFILE_COMPONENT_TYPE.VIDEO,
    category: PROFILE_COMPONENT_CATEGORY.VIDEO,
    value: "https://www.youtube.com/embed/ekr2nIex040?si=ip9BjeIhkp30ejcS",
  },
  {
    id: 9,
    type: PROFILE_COMPONENT_TYPE.MAP,
    category: PROFILE_COMPONENT_CATEGORY.MAP,
    value:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5641.033400395882!2d103.85507134698486!3d1.2862602131934748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19ee4cc09203%3A0x26c9afefa555dd7!2sMarina%20Bay%20Sands%20Singapore!5e0!3m2!1sen!2ssg!4v1732018272377!5m2!1sen!2ssg",
  },
  {
    id: 10,
    type: PROFILE_COMPONENT_TYPE.DISCORD,
    category: PROFILE_COMPONENT_CATEGORY.LINK,
    value: "https://discord.com",
  },
];

const profileCard: ProfileCard = {
  id: "1",
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
};
