const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  let users = [];

  console.log("Started Seeding User.");

  // Create 60 users with cards and info
  for (let i = 0; i < 60; i++) {
    console.log(`Seeding User.${i + 1}`);
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
          create: {
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
          },
        },
      },
      include: { Card: true },
    });

    users.push(user);
  }

  // Create Requests and Contacts
  const allCards = users.map((u) => u.Card[0]);

  for (let i = 0; i < allCards.length; i++) {
    const senderCard = allCards[i];

    // Create 15–21 requests to random other cards
    const requestTargets = faker.helpers.arrayElements(
      allCards.filter((c) => c.id !== senderCard.id),
      faker.number.int({ min: 15, max: 21 })
    );

    for (const target of requestTargets) {
      await prisma.request.create({
        data: {
          cardId: target.id,
          senderCardId: senderCard.id,
        },
      });
    }

    // Create 15–21 contacts
    const contactTargets = faker.helpers.arrayElements(
      allCards.filter((c) => c.id !== senderCard.id),
      faker.number.int({ min: 15, max: 21 })
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
  }

  console.log(
    "Seeded 60 users with cards, information, requests, and contacts."
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
