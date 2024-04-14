import { Roles, rolesMockup } from "@/data/rolesMockup";

class RoleRepo {
  async findAll() {
    return rolesMockup;
  }
  async findByName(name: string) {
    return rolesMockup.find(
      (item) => item.roleName.toLowerCase() === name.toLowerCase()
    );
  }
  async findById(id: string) {
    return rolesMockup.find((item) => item.id === id);
  }
  async store(role: Roles) {
    role.id = crypto.randomUUID();
    role.createdAt = new Date();
    rolesMockup.push(role);
    return role;
  }
  async update(data: Roles) {
    const role = rolesMockup.find((item) => item.id === data.id);
    if (!role) return false;
    Object.assign(role, data);
    return role;
  }
  async delete(id: string) {
    const index = rolesMockup.findIndex((item) => item.id === id);
    if (index === -1) return false;
    rolesMockup.splice(index, 1);
    return true;
  }
}

export default RoleRepo;
