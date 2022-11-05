import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@email.com",
      avatarUrl: "https://github.com/ricardroberg.png",
      googleId: "asdasdsdasdad32432453454adasdad",
    },
  });

  const poll = await prisma.poll.create({
    data: {
      title: "Example Poll",
      code: "BOL123",
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  // const participant = await prisma.participant.create({
  //   data: {
  //     pollId: poll.id,
  //     userId: user.id,
  //   },
  // });

  await prisma.game.create({
    data: {
      date: "2022-11-02T13:00:00.024Z",
      firstTeamCountryCode: "DE",
      secondTeamCountryCode: "BR",
    },
  });

  await prisma.game.create({
    data: {
      date: "2022-11-03T13:00:00.024Z",
      firstTeamCountryCode: "AR",
      secondTeamCountryCode: "UK",

      guesses: {
        create: {
          firstTeamPoints: 1,
          secondTeamPoints: 3,

          participant: {
            connect: {
              userId_pollId: {
                userId: user.id,
                pollId: poll.id,
              },
            },
          },
        },
      },
    },
  });
}
main();
