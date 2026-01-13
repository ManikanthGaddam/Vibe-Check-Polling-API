import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const poll = await prisma.poll.create({
    data: {
      question: "Is Prisma finally working?",
      options: {
        create: [
          { text: "Yes" },
          { text: "Absolutely yes" }
        ]
      }
    }
  });

  console.log("Created poll:", poll);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
