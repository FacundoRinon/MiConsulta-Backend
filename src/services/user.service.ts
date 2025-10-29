import { prisma } from "../db/prismaClient.js";

export async function getAllUsers() {
  return prisma.users.findMany();
}
