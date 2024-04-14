import { faker } from "@faker-js/faker";
import { Roles } from "./rolesMockup";
import { rolesMockup } from "./rolesMockup";
import { randomNumbers } from "@/lib/utils";
export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date | string;
  role: Roles;
};
const usersMockup: UserType[] = Array.from({ length: 100 }, () => ({
  id: crypto.randomUUID(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  createdAt: faker.date.past(),
  role: rolesMockup[randomNumbers(0, rolesMockup.length)],
}));
export { usersMockup };
