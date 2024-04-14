import { faker } from "@faker-js/faker";
export type Roles = {
  id: string;
  roleName: string;
  createdAt: Date | string;
};
const roles = Array.from({ length: 10 }, () => ({
  roleName: faker.person.jobType(),
}));
roles.push({ roleName: "Administrator" });
const uniqueRoles = new Set(roles.map((item) => item.roleName));
const rolesMockup: Roles[] = Array.from(uniqueRoles)
  .map((item) => ({
    id: crypto.randomUUID(),
    roleName: item,
    createdAt: faker.date.past(),
  }))
  .sort((a, b) =>
    a.roleName.toLowerCase().localeCompare(b.roleName.toLowerCase())
  );

export { rolesMockup };
