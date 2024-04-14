import { Roles, rolesMockup } from "@/data/rolesMockup";
import { PrismaClient } from "@prisma/client";

class RoleRepo {
  private readonly prisma: PrismaClient = new PrismaClient();
  async findAll() {
    return rolesMockup;
  }
  async findByName(name: string) {
    const data = await this.prisma.roles.findUnique({
      where: { role_name: name },
    });
    return data;
  }
  async findById(id: string) {
    const data = await this.prisma.roles.findUnique({ where: { id } });
    return data;
  }
  async store(role: Roles) {
    role.id = crypto.randomUUID();
    const data = await this.prisma.roles.create({ data: role });
    return data;
  }
  async update(role: Roles) {
    const data = await this.prisma.roles.update({
      where: { id: role.id },
      data: role,
    });
    return data;
  }
  async delete(id: string) {
    const data = await this.prisma.roles.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return data;
  }
}

export default RoleRepo;
