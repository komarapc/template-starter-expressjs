import { ErrorMessage } from "@/lib/utils";
import { Tokens } from "./tokens.repo";

export const validateTokenInput = (data: Tokens) => {
  const errors: ErrorMessage<Tokens>[] = [];
  if (!data.user_id)
    errors.push({ field: "user_id", message: "User ID is required" });
  return errors;
};
