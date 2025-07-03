const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

const prisma = new PrismaClient();

// Original testing component list (card_id will be overridden)
const profileDndComponents = [
  {
    id: uuidv4(),
    card_id: "1",
    type: "EMAIL",
    category: "MAIL",
    label: "Work Email",
    value: "john.doe@example.com",
    position: 0,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "LINK",
    category: "LINK",
    label: "Personal Website",
    value: "https://johndoe.com",
    position: 1,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "PHONE",
    category: "PHONE",
    label: "Mobile",
    value: "6594832945",
    position: 2,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "WHATSAPP",
    category: "LINK",
    label: "WhatsApp Number",
    value: "https://wa.me/6594832945",
    position: 3,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "TELEGRAM",
    category: "LINK",
    label: "My Telegram",
    value: "https://t.me/Kyaw_Za_Yan_Naing",
    position: 4,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "HEADING",
    category: "TEXT",
    label: "Name",
    value: "My Best Image!",
    position: 5,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "IMAGE",
    category: "IMAGE",
    label: "",
    value:
      "https://uz4l01v58c.ufs.sh/f/vgsYHuXFuRcjfOy3AK6SI2G6hNXCYW8TlxQ50wbMou7pare3",
    position: 6,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "HEADING",
    category: "TEXT",
    label: "Name",
    value: "My Address",
    position: 7,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "YOUTUBE",
    category: "LINK",
    label: "My Youtube Channel",
    value: "https://www.youtube.com/channel/UCBo1hnzxV9rz3WVsv__Rn1g",
    position: 8,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "HEADING",
    category: "TEXT",
    label: "Name",
    value: "My Social Media Links",
    position: 9,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "DISCORD",
    category: "LINK",
    label: "Discord Account",
    value: "dice#3040",
    position: 10,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "GITHUB",
    category: "LINK",
    label: "GitHub Profile",
    value: "https://github.com/johndoe",
    position: 11,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "LINKEDIN",
    category: "LINK",
    label: "LinkedIn Profile",
    value: "https://www.linkedin.com/in/johndoe",
    position: 12,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "FACEBOOK",
    category: "LINK",
    label: "Facebook Page",
    value: "https://www.facebook.com/johndoe",
    position: 13,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "INSTAGRAM",
    category: "LINK",
    label: "Instagram Profile",
    value: "https://www.instagram.com/johndoe",
    position: 14,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "TWITTER",
    category: "LINK",
    label: "Twitter Profile",
    value: "https://twitter.com/johndoe",
    position: 15,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "TIKTOK",
    category: "LINK",
    label: "TikTok Profile",
    value: "https://www.tiktok.com/@johndoe",
    position: 16,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "PINTEREST",
    category: "LINK",
    label: "Pinterest Board",
    value: "https://www.pinterest.com/johndoe/myboard",
    position: 17,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "PAYPAL",
    category: "LINK",
    label: "PayPal Link",
    value: "https://www.paypal.com/paypalme/johndoe",
    position: 18,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "ZOOM",
    category: "LINK",
    label: "Zoom Meeting",
    value: "https://zoom.us/j/1234567890",
    position: 19,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "GOOGLE_MEET",
    category: "LINK",
    label: "Google Meet",
    value: "https://meet.google.com/abc-defg-hij",
    position: 20,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "MICROSOFT_TEAMS",
    category: "LINK",
    label: "Microsoft Teams Meeting",
    value: "https://teams.microsoft.com/l/meetup-join/abc123",
    position: 21,
  },
  {
    id: "123",
    card_id: "1",
    type: "DRIBBBLE",
    category: "LINK",
    label: "Dribbble Profile",
    value: "https://dribbble.com/johndoe",
    position: 22,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "BEHANCE",
    category: "LINK",
    label: "Behance Portfolio",
    value: "https://www.behance.net/johndoe",
    position: 23,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "LINKEDIN_POST",
    category: "SOCIAL_EMBED",
    label: "LinkedIn Post",
    value:
      "https://www.linkedin.com/embed/feed/update/urn:li:share:7329037915160834049?compact=1",
    position: 24,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "TWITTER_POST",
    category: "SOCIAL_EMBED",
    label: "Twitter Tweet",
    value: "https://twitter.com/AppleSupport/status/1873769925375860807",
    position: 25,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "INSTAGRAM_POST",
    category: "SOCIAL_EMBED",
    label: "Instagram Post",
    value:
      "https://www.instagram.com/p/DEOoN1KunCl/?utm_source=ig_web_copy_link",
    position: 26,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "YOUTUBE_POST",
    category: "SOCIAL_EMBED",
    label: "YouTube Video",
    value: "https://www.youtube.com/watch?v=ekr2nIex040",
    position: 27,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "FACEBOOK_POST",
    category: "SOCIAL_EMBED",
    label: "Facebook Post",
    value:
      "https://www.facebook.com/Genshinimpact/posts/pfbid02sCNWWoC7aGpE53Wp2Ja1TSLCQwopxyACnMfiiqLxL3ypbqvU8tCXy1cDJoYFrXqCl/",
    position: 28,
  },
  {
    id: uuidv4(),
    card_id: "1",
    type: "TIKTOK_POST",
    category: "SOCIAL_EMBED",
    label: "TikTok Post",
    value:
      "https://www.tiktok.com/@wasted.a1/video/7253096002691894530?is_from_webapp=1&sender_device=pc&web_id=7454463793868195344",
    position: 29,
  },
];

// Main seeding function
async function main() {
  console.log("🌱 Started Seeding 10 Users with 2 Cards Each");
  const users = [];

  // 1. Create 10 users, each with 2 cards
  for (let i = 0; i < 10; i++) {
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const plainPassword = faker.internet.password();
    const passwordHash = await bcrypt.hash(plainPassword, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: fullName,
        Card: {
          create: Array.from({ length: 2 }).map(() => ({
            title: `${fullName}'s Card`,
            Information: {
              create: {
                fullName,
                occupation: faker.person.jobTitle(),
                company: faker.company.name(),
                message: faker.lorem.sentence(),
                quote: faker.lorem.sentence(),
                preferredName: faker.person.firstName(),
                pronouns: faker.person.sexType(),
              },
            },
          })),
        },
      },
      include: { Card: true },
    });

    users.push(user);
  }

  // 2. Gather all cards
  const allCards = users.flatMap((u) => u.Card);

  // 3. Create design and profile components for each card
  for (const card of allCards) {
    await prisma.design.create({
      data: {
        cardId: card.id,
        foregroundColor: "#ffffff",
        backgroundColor: "#000000",
        profileImage: "/image/profile.jpg",
        logoImage: "/image/profile.jpg",
        layout: faker.helpers.arrayElement([
          "LAYOUT_ONE",
          "LAYOUT_TWO",
          "LAYOUT_THREE",
        ]),
      },
    });

    for (const component of profileDndComponents) {
      await prisma.profileComponent.create({
        data: {
          cardId: card.id,
          type: component.type,
          category: component.category,
          label: component.label,
          value: component.value,
          position: component.position,
        },
      });
    }

    console.log(`✅ Seeded components + design for card: ${card.id}`);
  }

  // 4. Create random Requests & Contacts between cards
  for (const senderCard of allCards) {
    const others = allCards.filter((c) => c.id !== senderCard.id);

    // Requests (to 2–4 random cards)
    const requestTargets = faker.helpers.arrayElements(
      others,
      faker.number.int({ min: 2, max: 4 })
    );
    for (const target of requestTargets) {
      await prisma.request.create({
        data: {
          cardId: target.id,
          senderCardId: senderCard.id,
        },
      });
    }

    // Contacts (to 2–3 random cards)
    const contactTargets = faker.helpers.arrayElements(
      others,
      faker.number.int({ min: 2, max: 3 })
    );
    for (const contact of contactTargets) {
      await prisma.contact.create({
        data: {
          cardId: senderCard.id,
          contactCardId: contact.id,
          tag: faker.helpers.arrayElement([
            "FRIEND",
            "CLIENT",
            "SUPPLIER",
            "FAVOURITE",
            "NEW",
          ]),
          note: faker.lorem.sentence(),
        },
      });
    }

    console.log(`🔁 Seeded requests and contacts for card: ${senderCard.id}`);
  }

  console.log("🎉 Done seeding 10 users × 2 cards with full data!");
}

// Final execution
main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
