import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function seedProfessionalBranch(prisma: PrismaClient) {
  const count = await prisma.professional_branch.count();
  if (count > 0) {
    console.log("Professional branches already exist. Skip.");
    return;
  }

  // 🔹 Traer todos los profesionales
  const professionals = await prisma.professionals.findMany();

  // 🔹 Traer todos los branch
  const branches = await prisma.branch.findMany();

  if (!professionals.length || !branches.length) {
    throw new Error("No professionals or branches found.");
  }

  const professionalBranches = [];

  for (const prof of professionals) {
    // Elegir un branch random
    const randomBranch = branches[Math.floor(Math.random() * branches.length)];

    professionalBranches.push({
      id: uuidv4(),
      professional_id: prof.id,
      branch_id: randomBranch.id,
    });
  }

  await prisma.professional_branch.createMany({
    data: professionalBranches,
  });

  console.log(
    `✅ ${professionalBranches.length} professional branches generated.`
  );
}
