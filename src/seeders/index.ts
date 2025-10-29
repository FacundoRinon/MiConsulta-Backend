import { PrismaClient } from "@prisma/client";
import { seedStates } from "./status.seeder";
import { seedUsers } from "./user.seeder";
import { seedProfessionals } from "./professional.seeder";
import { seedBranch } from "./branch.seeder";
import { seedLocations } from "./locations.seeder";
import { seedProfessionalBranch } from "./professional_branch.seeder";
import { seedAvailability } from "./availability.seeder";
import { seedConsult } from "./consult.seeder";

const prisma = new PrismaClient();

//npx ts-node src/seeders/index.ts
async function main() {
  console.log("🚨 Borrando datos existentes...");

  // 1️⃣ Tablas que dependen de otras (hijas)
  await prisma.consult.deleteMany({});
  await prisma.availabilities.deleteMany({});
  await prisma.locations.deleteMany({});
  await prisma.professional_branch.deleteMany({});

  // 2️⃣ Tablas que son referenciadas por otras (padres)
  await prisma.branch.deleteMany({});
  await prisma.professionals.deleteMany({});
  await prisma.users.deleteMany({});

  // 3️⃣ Tablas de estados
  await prisma.consult_type.deleteMany({});
  await prisma.recurrence_group.deleteMany({});
  await prisma.recurrence_pattern.deleteMany({});
  await prisma.modalities.deleteMany({});
  await prisma.availability_state.deleteMany({});
  await prisma.professional_states.deleteMany({});
  await prisma.user_states.deleteMany({});

  console.log("✅ Datos existentes borrados.");

  console.log("🚀 Ejecutando seeds...");
  await seedStates(prisma);
  await seedProfessionals(prisma);
  await seedUsers(prisma, 20);
  await seedBranch(prisma);
  await seedProfessionalBranch(prisma);
  await seedLocations(prisma);
  await seedAvailability(prisma);
  await seedConsult(prisma);
  console.log("🎉 Seeder completo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
