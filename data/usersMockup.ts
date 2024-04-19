import { faker } from "@faker-js/faker";
import { rolesMockup } from "./rolesMockup";
import { randomNumbers } from "@/lib/utils";
import * as bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/config/app";
export type UserType = {
  id: string;
  name: string;
  email: string;
  password: string;
  role_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | string | null;
};
export type UserNoPasswordField = {
  id: string;
  name: string;
  email: string;
  role_id: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | string | null;
};
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
export { usersMockup };
