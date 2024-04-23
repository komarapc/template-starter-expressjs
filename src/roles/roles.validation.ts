import { Roles } from "@/data/rolesMockup";
import { ErrorMessage } from "@/lib/utils";

const validateRole = (role: Roles) => {
  const errors: ErrorMessage<Roles>[] = [];
  if (!role.role_name || !role.role_name.trim())
    errors.push({ field: "role_name", message: "Required" });
  return errors;
};

export { validateRole };
