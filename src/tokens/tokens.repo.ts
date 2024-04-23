import { PrismaClient } from "@prisma/client";
export type Tokens = {
  id: string;
  user_id: string;
  token: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
};
class TokenRepo {
  private readonly prisma: PrismaClient = new PrismaClient();
  async findAll() {
    const data = await this.prisma.tokens.findMany({
      where: { deleted_at: null },
    });
    return data;
  }

  async findById(id: string) {
    const data = await this.prisma.tokens.findUnique({ where: { id } });
    return data;
  }

  async findByUserId(user_id: string) {
    const data = await this.prisma.tokens.findUnique({ where: { user_id } });
    return data;
  }

  async store(data: Tokens) {
    const token = await this.prisma.tokens.upsert({
      where: { user_id: data.user_id },
      update: data,
      create: data,
    });
    return data;
  }

  async delete(id: string) {
    const data = await this.prisma.tokens.delete({ where: { id } });
    return data;
  }
}
export default TokenRepo;
