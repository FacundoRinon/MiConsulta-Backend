import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function seedBranch(prisma: PrismaClient) {
  const count = await prisma.branch.count();
  if (count > 0) {
    console.log("⚠️ Branches ya existen. Saltando seed.");
    return;
  }

  // Traer profesiones disponibles
  const professions = await prisma.professions.findMany();
  if (!professions.length) {
    throw new Error("❌ No hay profesiones en la base de datos.");
  }

  const branchNames = [
    "cognitivo-conductual",
    "psicoanálisis",
    "conductual",
    "sistémica",
  ];

  const branches = [];

  // Por cada profesión, crear los 4 branches
  for (const profession of professions) {
    for (const name of branchNames) {
      branches.push({
        id: uuidv4(),
        name,
        description: faker.lorem.paragraph(),
        profession_id: profession.id,
      });
    }
  }

  await prisma.branch.createMany({ data: branches });

  console.log(`✅ ${branches.length} branches creadas correctamente.`);
}
