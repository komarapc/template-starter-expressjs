import { excludeFields, responseError, responseSuccess } from "@/lib/utils";
import UserRepo from "./users.repo";
import { UserType } from "@/data/usersMockup";
import { validateUser } from "./users.validation";
import BearerMiddlewaree from "@/middleware/bearer.middleware";

class UserService {
  private readonly userRepo: UserRepo = new UserRepo();
  private readonly bearer: BearerMiddlewaree = new BearerMiddlewaree();
  async findAll() {
    try {
      const users = await this.userRepo.findAll();
      console.log("token", await this.bearer.getToken());
      return responseSuccess({ code: 200, data: { users } });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepo.findById(id);
      if (!user) return responseError({ code: 404 });
      const exludedUser = excludeFields(user, ["password"]);
      return responseSuccess({ code: 200, data: exludedUser });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async store(user: UserType) {
    try {
      const errors = validateUser(user);
      if (errors.length) return responseError({ code: 400, message: errors });
      const [userExist, roleExist] = await Promise.all([
        this.userRepo.findById(user.email),
        this.userRepo.findById(user.role_id),
      ]);
      if (!roleExist)
        return responseError({ code: 404, message: "Role not found" });
      if (userExist) return responseError({ code: 409 });
      const storeUser = await this.userRepo.store(user);
      return responseSuccess({ code: 201, data: storeUser });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async update(id: string, user: UserType) {
    try {
      const errors = validateUser(user);
      if (errors.length) return responseError({ code: 400, message: errors });
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
