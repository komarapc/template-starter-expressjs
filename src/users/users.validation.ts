import { UserType } from "@/data/usersMockup";
import { ErrorMessage } from "@/lib/utils";

export const validateUser = (user: UserType) => {
  const errors: ErrorMessage<UserType>[] = [];
  if (!user.email) errors.push({ key: "email", message: "Email is required" });
  if (!user.password)
    errors.push({ key: "password", message: "Password is required" });
  if (!user.name) errors.push({ key: "name", message: "Name is required" });
  if (!user.role_id)
    errors.push({ key: "role_id", message: "Role is required" });
  return errors;
};
