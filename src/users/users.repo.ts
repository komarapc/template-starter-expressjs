import { usersMockup, UserType } from "@/data/usersMockup";

class UserRepo {
  async findAll() {
    return usersMockup;
  }
  async findById(id: string) {
    return usersMockup.find((item) => item.id === id);
  }
  async findByEmail(email: string) {
    return usersMockup.find(
      (item) => item.email.toLowerCase() === email.toLowerCase()
    );
  }
  async store(user: UserType) {
    user.id = crypto.randomUUID();
    usersMockup.push(user);
    return user;
  }
  async update(id: string, data: UserType) {
    const user = usersMockup.find((item) => item.id === id);
    if (!user) return false;
    Object.assign(user, data);
    return user;
  }
  async delete(id: string) {
    const index = usersMockup.findIndex((item) => item.id === id);
    if (index === -1) return false;
    usersMockup.splice(index, 1);
    return true;
  }
}

export default UserRepo;
