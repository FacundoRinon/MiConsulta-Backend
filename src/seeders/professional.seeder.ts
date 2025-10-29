import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { Encryptor } from "../frameworks/encryptor/bcrypt";

export async function seedProfessionals(
  prisma: PrismaClient,
  numberOfProfessionals = 20
) {
  const count = await prisma.users.count();
  if (count > 0) {
    console.log("Professionals already exist. Skip.");
    return;
  }

  // ⚡ Traer status y perfiles válidos
  const activeStatus = await prisma.professional_states.findFirst({
    where: { name: "active" },
  });
  const inactiveStatus = await prisma.professional_states.findFirst({
    where: { name: "inactive" },
  });

  // Traer country
  const country = await prisma.countries.findMany({
    where: { name: "uruguay" },
  });

  // Traer profesion
  const profession = await prisma.professions.findMany({
    where: { name: "psychologist" },
  });

  // Traer document type
  const document_type = await prisma.document_type.findMany({
    where: { name: "C.I." },
  });

  if (!activeStatus || !inactiveStatus) {
    throw new Error("Status not found.");
  }

  const encryptor = new Encryptor();
  const hashed = await encryptor.encrypt("1234");

  const professional = [];

  // 🔹 Crear usuarios aleatorios
  for (let i = 0; i < numberOfProfessionals; i++) {
    const status_id = Math.random() < 0.8 ? activeStatus.id : inactiveStatus.id;

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    professional.push({
      id: uuidv4(),
      first_name: firstName,
      last_name: lastName,
      birth_date: faker.date.past({ years: 50, refDate: new Date(1995, 0, 1) }),
      profession_id: profession[0].id,
      country_id: country[0].id,
      location: faker.location.city(),
      img: faker.image.avatar(),
      description: faker.lorem.paragraph(),
      state_id: status_id,
      price: faker.number.int({ min: 1000, max: 2000 }),
      created_at: new Date(),
      updated_at: new Date(),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      password: hashed,
      document_type_id: document_type[0].id,
      document_number: faker.string.numeric(8),
      phone: faker.phone.number(),
    });
  }

  await prisma.professionals.createMany({
    data: professional,
  });

  console.log(`✅ ${numberOfProfessionals + 1} professionals generated.`);
}
