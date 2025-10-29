import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

export async function seedAvailability(prisma: PrismaClient) {
  const count = await prisma.availabilities.count();
  if (count > 0) {
    console.log("⚠️ Availabilities already exist. Skipping seed.");
    return;
  }

  // Traer datos base
  const modalities = await prisma.modalities.findMany();
  const states = await prisma.availability_state.findMany();
  const professionals = await prisma.professionals.findMany();

  if (!modalities.length || !states.length || !professionals.length) {
    throw new Error(
      "❌ Faltan datos base (modalities, states o professionals)."
    );
  }

  const availabilities = [];

  for (const professional of professionals) {
    // Creamos 15 horarios por profesional
    // Estructura: { [day_of_week]: [hours ya usadas] }
    const usedHoursByDay: Record<number, Set<number>> = {};

    for (let i = 0; i < 15; i++) {
      const day_of_week = faker.number.int({ min: 0, max: 6 });

      // Aseguramos que el día tenga inicializado su set de horas usadas
      if (!usedHoursByDay[day_of_week]) usedHoursByDay[day_of_week] = new Set();

      let startHour: number;

      // Evitar solapamiento dentro del mismo día
      do {
        startHour = faker.number.int({ min: 8, max: 18 }); // 8 a 18hs
      } while (usedHoursByDay[day_of_week].has(startHour));

      // Marcamos esa hora como usada
      usedHoursByDay[day_of_week].add(startHour);

      const init_hour = new Date(2025, 0, 1, startHour, 0, 0);
      const end_hour = new Date(2025, 0, 1, startHour + 1, 0, 0);

      const randomModality = faker.helpers.arrayElement(modalities);
      const randomState = faker.helpers.arrayElement(states);

      availabilities.push({
        id: uuidv4(),
        professional_id: professional.id,
        day_of_week,
        init_hour,
        end_hour,
        modality_id: randomModality.id,
        state_id: randomState.id,
      });
    }
  }

  await prisma.availabilities.createMany({
    data: availabilities,
  });

  console.log(
    `✅ ${availabilities.length} availabilities created successfully.`
  );
}
