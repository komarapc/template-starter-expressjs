import { UserType } from "@/data/usersMockup";
import { ErrorMessage } from "@/lib/utils";
import { z } from "zod";
const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string(),
  role_id: z.string(),
});
export const validateUser = (user: UserType) => {
  const errors: ErrorMessage<UserType>[] = [];
  const result = FormSchema.safeParse(user);
  if (!result.success) {
    for (const issue of result.error.issues) {
      errors.push({
        field: issue.path[0] as keyof UserType,
        message: issue.message,
      });
    }
  }
  return errors;
};
