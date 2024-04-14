import { usersMockup, UserType } from "@/data/usersMockup";
import { PrismaClient } from "@prisma/client";

class UserRepo {
  private readonly prisma: PrismaClient = new PrismaClient();
  async findAll() {
    const data = await this.prisma.users.findMany();
    return data;
  }
  async findById(id: string) {
    const data = await this.prisma.users.findUnique({ where: { id } });
    return data;
  }
  async findByEmail(email: string) {
    const data = await this.prisma.users.findUnique({ where: { email } });
    return data;
  }
  async store(user: UserType) {
    user.id = crypto.randomUUID();
    const data = await this.prisma.users.create({ data: user });
    return data;
  }
  async update(id: string, data: UserType) {
    if (!(await this.findById(id))) return false;
    const update = await this.prisma.users.update({
      where: { id },
      data,
    });
    return update;
  }
  async delete(id: string) {
    if (!(await this.findById(id))) return false;
    const data = await this.prisma.users.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return data;
  }
}

export default UserRepo;
