import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function seedConsult(prisma: PrismaClient) {
  const count = await prisma.consult.count();
  if (count > 0) {
    console.log("Consults already exist. Skip.");
    return;
  }

  // 🔹 Traer datos necesarios
  const users = await prisma.users.findMany();
  const availabilities = await prisma.availabilities.findMany();
  const consultTypes = await prisma.consult_type.findMany();
  const recurrencePatterns = await prisma.recurrence_pattern.findMany();
  const recurrenceGroups = await prisma.recurrence_group.findMany();
  const modalities = await prisma.modalities.findMany();

  if (!users.length || !availabilities.length) {
    throw new Error("Users or availabilities not found.");
  }

  const usedAvailabilityIds = new Set<string>();
  const consults = [];

  for (const user of users) {
    // 🔹 Elegir availability que no haya sido usada
    const availableOptions = availabilities.filter(
      (a) => !usedAvailabilityIds.has(a.id)
    );
    if (!availableOptions.length) break;

    const availability = faker.helpers.arrayElement(availableOptions);
    usedAvailabilityIds.add(availability.id);

    // 🔹 Tipo de consulta random
    const type = faker.helpers.arrayElement(consultTypes);

    // 🔹 Recurrence pattern
    let recurrencePatternName: string;
    if (type.name.toLowerCase() === "first") {
      recurrencePatternName = "none";
    } else {
      recurrencePatternName = "weekly"; // por ahora solo weekly para las no first
    }

    // 🔹 Recurrence pattern
    let recurrencePattern = recurrencePatterns.find(
      (rp) => rp.name.toLowerCase() === recurrencePatternName
    );
    // fallback en caso de que no lo encuentre
    if (!recurrencePattern) {
      throw new Error(`Recurrence pattern not found: ${recurrencePatternName}`);
    }

    // 🔹 Recurrence group
    let recurrenceGroup;
    if (recurrencePatternName === "none") {
      recurrenceGroup = recurrenceGroups.find((rg) => rg.name === "0");
    } else if (recurrencePatternName === "weekly") {
      recurrenceGroup = recurrenceGroups.find((rg) => rg.name === "1");
    } else {
      recurrenceGroup = faker.helpers.arrayElement(
        recurrenceGroups.filter((rg) => ["A_1_3", "B_2_4"].includes(rg.name))
      );
    }

    if (!recurrenceGroup) {
      throw new Error(
        `Recurrence group not found for pattern: ${recurrencePatternName}`
      );
    }

    // 🔹 Fechas
    const createdAt = faker.date.recent({ days: 14 });
    const sessionDate = faker.date.future({ years: 0.1 });

    consults.push({
      id: uuidv4(),
      user_id: user.id,
      professional_id: availability.professional_id,
      availability_id: availability.id,
      session_date: sessionDate,
      init_hour: availability.init_hour,
      end_hour: availability.end_hour,
      type_id: type.id,
      recurrence_pattern_id: recurrencePattern.id,
      recurrence_group_id: recurrenceGroup.id,
      created_at: createdAt,
      location: faker.location.streetAddress(),
      modality_id: availability.modality_id,
    });
  }

  await prisma.consult.createMany({ data: consults });
  console.log(`✅ ${consults.length} consults generated.`);
}
