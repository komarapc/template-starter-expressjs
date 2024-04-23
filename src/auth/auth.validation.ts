import { ErrorMessage } from "@/lib/utils";
import { AuthProps } from "./auth.service";
import { z } from "zod";

const AuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export const validateAuth = (data: AuthProps) => {
  const result = AuthSchema.safeParse(data);
  const errors: ErrorMessage<AuthProps>[] = [];

  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push({
        field: issue.path[0] as keyof AuthProps,
        message: issue.message,
      });
    }
  }

  return { data, errors };
};
