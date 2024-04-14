import { SALT_ROUNDS } from "../config/app";
import { randomNumbers } from "./../lib/utils";
import { PrismaClient } from "@prisma/client";
import { Roles } from "../data/rolesMockup";
import { UserType } from "../data/usersMockup";
import { faker } from "@faker-js/faker";
import * as bcrypt from "bcrypt";
const prisma = new PrismaClient();

const roles = Array.from({ length: 10 }, () => ({
  role_name: faker.person.jobType(),
}));
roles.push({ role_name: "Administrator" });
const uniqueRoles = new Set(roles.map((item) => item.role_name));
const rolesMockup: Roles[] = Array.from(uniqueRoles)
  .map((item) => ({
    id: crypto.randomUUID(),
    role_name: item,
    created_at: faker.date.past(),
    updated_at: faker.date.recent(),
  }))
  .sort((a, b) =>
    a.role_name.toLowerCase().localeCompare(b.role_name.toLowerCase())
  );

const usersMockup: UserType[] = Array.from({ length: 100 }, () => ({
  id: crypto.randomUUID(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: bcrypt.hashSync("password", SALT_ROUNDS),
  role_id: rolesMockup[randomNumbers(0, rolesMockup.length - 1)].id,
  created_at: faker.date.recent(),
  updated_at: faker.date.recent(),
  deleted_at: null,
}));

async function main() {
  for (const role of rolesMockup) {
    await prisma.roles.create({
      data: role,
    });
  }

  console.log("Roles created successfully");

  for (const user of usersMockup) {
    await prisma.users.create({
      data: user,
    });
  }

  console.log("Users created successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.error(err);
    await prisma.$disconnect();
  });
