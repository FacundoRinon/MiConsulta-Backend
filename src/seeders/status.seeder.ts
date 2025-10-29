import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function seedStates(prisma: PrismaClient) {
  await seedStateTable(prisma, "user_states", [
    { id: uuidv4(), name: "active" },
    { id: uuidv4(), name: "inactive" },
    { id: uuidv4(), name: "suspended" },
  ]);

  // Seed professional_states
  await seedStateTable(prisma, "professional_states", [
    { id: uuidv4(), name: "active" },
    { id: uuidv4(), name: "inactive" },
    { id: uuidv4(), name: "suspended" },
  ]);

  // Seed availability_states
  await seedStateTable(prisma, "availability_states", [
    { id: uuidv4(), name: "active" },
    { id: uuidv4(), name: "inactive" },
  ]);
  // Seed consult_type
  await seedStateTable(prisma, "consult_type", [
    { id: uuidv4(), name: "first" },
    { id: uuidv4(), name: "regular" },
    { id: uuidv4(), name: "rescheduled" },
  ]);

  // Seed countries
  await seedStateTable(prisma, "countries", [
    { id: uuidv4(), name: "uruguay" },
    { id: uuidv4(), name: "argentina" },
  ]);

  // Seed professions
  await seedStateTable(prisma, "professions", [
    { id: uuidv4(), name: "psychologist" },
    { id: uuidv4(), name: "psychiatrist" },
  ]);

  // Seed modalities
  await seedStateTable(prisma, "modalities", [
    { id: uuidv4(), name: "remote" },
    { id: uuidv4(), name: "presencial" },
    { id: uuidv4(), name: "remote or presencial" },
  ]);

  // Seed recurrence_group
  await seedStateTable(prisma, "recurrence_group", [
    { id: uuidv4(), name: "0" },
    { id: uuidv4(), name: "1" },
    { id: uuidv4(), name: "A_1_3" },
    { id: uuidv4(), name: "B_2_4" },
  ]);

  // Seed recurrence_pattern
  await seedStateTable(prisma, "recurrence_pattern", [
    { id: uuidv4(), name: "none" },
    { id: uuidv4(), name: "weekly" },
    { id: uuidv4(), name: "biweekly" },
  ]);

  // Seed document_type
  await seedStateTable(prisma, "document_type", [
    { id: uuidv4(), name: "C.I." },
    { id: uuidv4(), name: "Passport" },
  ]);
}

async function seedStateTable(
  prisma: PrismaClient,
  tableName:
    | "user_states"
    | "professional_states"
    | "availability_states"
    | "consult_type"
    | "modalities"
    | "countries"
    | "professions"
    | "recurrence_group"
    | "recurrence_pattern"
    | "document_type",
  data: { id: string; name: string }[]
) {
  switch (tableName) {
    case "user_states":
      await prisma.user_states.deleteMany();
      await prisma.user_states.createMany({ data });
      break;
    case "professional_states":
      await prisma.professional_states.deleteMany();
      await prisma.professional_states.createMany({ data });
      break;
    case "availability_states":
      await prisma.availability_state.deleteMany();
      await prisma.availability_state.createMany({ data });
      break;
    case "consult_type":
      await prisma.consult_type.deleteMany();
      await prisma.consult_type.createMany({ data });
      break;
    case "modalities":
      await prisma.modalities.deleteMany();
      await prisma.modalities.createMany({ data });
      break;
    case "countries":
      await prisma.countries.deleteMany();
      await prisma.countries.createMany({ data });
      break;
    case "professions":
      await prisma.professions.deleteMany();
      await prisma.professions.createMany({ data });
      break;
    case "recurrence_group":
      await prisma.recurrence_group.deleteMany();
      await prisma.recurrence_group.createMany({ data });
      break;
    case "recurrence_pattern":
      await prisma.recurrence_pattern.deleteMany();
      await prisma.recurrence_pattern.createMany({ data });
      break;
    case "document_type":
      await prisma.document_type.deleteMany();
      await prisma.document_type.createMany({ data });
      break;
    default:
      throw new Error(`Tabla ${tableName} no soportada.`);
  }

  console.log(`✅ Estados insertados en ${tableName}`);
}
