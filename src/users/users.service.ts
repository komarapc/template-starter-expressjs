import { responseError, responseSuccess } from "@/lib/utils";
import UserRepo from "./users.repo";
import { UserType } from "@/data/usersMockup";

class UserService {
  private readonly userRepo: UserRepo = new UserRepo();

  async findAll() {
    try {
      const users = await this.userRepo.findAll();
      return responseSuccess({ code: 200, data: { users } });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) return responseError({ code: 404 });
      return responseSuccess({ code: 200, data: user });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async store(user: UserType) {
    try {
      const userExist = await this.userRepo.findById(user.email);
      if (userExist) return responseError({ code: 409 });
      const storeUser = await this.userRepo.store(user);
      return responseSuccess({ code: 201, data: storeUser });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async update(id: string, user: UserType) {
    try {
      if (id !== user.id) return responseError({ code: 403 });
      const userExist = await this.userRepo.findById(user.id);
      if (!userExist) return responseError({ code: 404 });
      const updateUser = await this.userRepo.update(id, user);
      if (!updateUser) return responseError({ code: 400 });
      return responseSuccess({
        code: 200,
        message: "Updated",
        data: updateUser,
      });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async delete(id: string) {
    try {
      if (!id)
        return responseError({
          code: 400,
          message: "Parameter id is required",
        });
      const user = await this.userRepo.findById(id);
      if (!user) return responseError({ code: 404 });
      await this.userRepo.delete(id);
      return responseSuccess({ code: 200, message: "Deleted" });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
}

export default UserService;
