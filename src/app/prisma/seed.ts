import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const scarletAndViolet = await prisma.series.upsert({
    where: { slug: "scarlet-and-violet" },
    update: {},
    create: {
      slug: "scarlet-and-violet",
      name: "Scarlet & Violet",
    },
  });

  const prismaticEvolutions = await prisma.subset.upsert({
    where: { slug: "prismatic-evolutions" },
    update: {},
    create: {
      slug: "prismatic-evolutions",
      name: "Prismatic Evolutions",
      seriesSlug: "scarlet-and-violet",
    },
  });

  await prisma.card.createMany({
    data: [
      {
        name: "Exeggcute",
        number: "001",
        imageUrl: "/scarlet-and-violet/prismatic-evolutions/svpe001.png",
        collected: true,
        subsetSlug: "prismatic-evolutions",
      },
      {
        name: "Exeggcutor",
        number: "002",
        imageUrl: "/scarlet-and-violet/prismatic-evolutions/svpe002.png",
        collected: true,
        subsetSlug: "prismatic-evolutions",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
