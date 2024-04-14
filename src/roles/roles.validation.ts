import { Roles } from "@/data/rolesMockup";
import { ErrorMessage } from "@/lib/utils";

const validateRole = (role: Roles) => {
  const errors: ErrorMessage<Roles>[] = [];
  if (!role.roleName || !role.roleName.trim())
    errors.push({ key: "roleName", message: "Required" });
  return errors;
};

export { validateRole };
