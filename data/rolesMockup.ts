import { faker } from "@faker-js/faker";
export type Roles = {
  id: string;
  role_name: string;
  created_at: Date | string;
  updated_at: Date | string;
  deleted_at?: Date | string;
};
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

export { rolesMockup };
