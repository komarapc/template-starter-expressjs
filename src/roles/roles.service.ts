import { Roles, rolesMockup } from "@/data/rolesMockup";
import { responseError, responseSuccess } from "@/lib/utils";
import RoleRepo from "./roles.repo";
import { validateRole } from "./roles.validation";

class RoleService {
  private readonly roleRepo: RoleRepo = new RoleRepo();
  async findAll() {
    try {
      const roles = await this.roleRepo.findAll();
      return responseSuccess({ code: 200, data: { roles } });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }

  async findById(id: string) {
    try {
      if (!id)
        return responseError({
          code: 400,
          message: "Parameter id is required",
        });
      const role = await this.roleRepo.findById(id);
      if (!role) return responseError({ code: 404 });
      return responseSuccess({ code: 200, data: role });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
  async store(role: Roles) {
    try {
      if (!Object.keys(role).length) return responseError({ code: 400 });
      const errors = validateRole(role);
      const roleExist = await this.roleRepo.findByName(role.role_name);
      if (roleExist)
        return responseError({ code: 409, message: "Already exist" });
      if (errors.length) return responseError({ code: 400, message: errors });
      const newRole = await this.roleRepo.store(role);
      return responseSuccess({ code: 201, data: newRole });
    } catch (error) {
      console.log(error);
      return responseError({ code: 500 });
    }
  }
  async update(id: string, data: Roles) {
    try {
      if (!Object.keys(data).length) return responseError({ code: 400 });
      const errors = validateRole(data);
      if (errors.length) return responseError({ code: 400, message: errors });
      const [existRole, existName] = await Promise.all([
        await this.roleRepo.findById(id),
        await this.roleRepo.findByName(data.role_name),
      ]);
      if (!existRole) return responseError({ code: 404 });
      if (existName)
        return responseError({ code: 409, message: "Already exist" });

      data.id = id;
      const updateRole = await this.roleRepo.update(data);
      if (!updateRole) return responseError({ code: 422 });
      return responseSuccess({
        code: 200,
        message: "Updated",
        data: updateRole,
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
      const role = await this.roleRepo.findById(id);
      if (!role) return responseError({ code: 404 });
      const deleteRole = await this.roleRepo.delete(id);
      if (!deleteRole) return responseError({ code: 422 });
      return responseSuccess({ code: 200, data: deleteRole });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
}

export default RoleService;
