import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";
import { Encryptor } from "../frameworks/encryptor/bcrypt";

export async function seedUsers(prisma: PrismaClient, numberOfUsers = 100) {
  const count = await prisma.users.count();
  if (count > 0) {
    console.log("Usuarios already exist. Skip.");
    return;
  }

  // ⚡ Traer status y perfiles válidos
  const activeStatus = await prisma.user_states.findFirst({
    where: { name: "active" },
  });
  const inactiveStatus = await prisma.user_states.findFirst({
    where: { name: "inactive" },
  });

  // Traer country
  const country = await prisma.countries.findMany({
    where: { name: "uruguay" },
  });

  // Traer document type
  const document_type = await prisma.document_type.findMany({
    where: { name: "C.I." },
  });

  if (!activeStatus || !inactiveStatus) {
    throw new Error("Status o perfiles no encontrados.");
  }

  const encryptor = new Encryptor();
  const hashed = await encryptor.encrypt("1234");

  const users = [];

  // 🔹 Crear usuarios aleatorios
  for (let i = 0; i < numberOfUsers; i++) {
    const status_id = Math.random() < 0.8 ? activeStatus.id : inactiveStatus.id;

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      id: uuidv4(),
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
      location: faker.location.city(),
      img: faker.image.avatar(),
      document_type_id: document_type[0].id,
      document_number: faker.string.numeric(8),
      state_id: status_id,
      country_id: country[0].id,
      birth_date: faker.date.past({ years: 50, refDate: new Date(1995, 0, 1) }),
      password: hashed,
      phone: faker.phone.number(),
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  await prisma.users.createMany({
    data: users,
  });

  console.log(`✅ ${numberOfUsers + 1} users generated.`);
}
