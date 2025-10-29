import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function seedLocations(prisma: PrismaClient) {
  const count = await prisma.locations.count();
  if (count > 0) {
    console.log("Locations already exist. Skip.");
    return;
  }

  // 🔹 Traer todos los profesionales
  const professionals = await prisma.professionals.findMany();

  // 🔹 Traer todas las modalidades
  const modalities = await prisma.modalities.findMany();

  if (!professionals.length || !modalities.length) {
    throw new Error("No professionals or modalities found.");
  }

  const locations = [];

  for (const prof of professionals) {
    for (const mod of modalities) {
      locations.push({
        id: uuidv4(),
        professional_id: prof.id,
        modality_id: mod.id,
        address_or_link:
          mod.name.toLowerCase() === "virtual"
            ? faker.internet.url()
            : faker.location.streetAddress(),
      });
    }
  }

  await prisma.locations.createMany({
    data: locations,
  });

  console.log(`✅ ${locations.length} locations generated.`);
}
