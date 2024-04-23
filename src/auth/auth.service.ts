import {
  debugError,
  excludeFields,
  generateHash,
  generateId,
  responseError,
  responseSuccess,
} from "@/lib/utils";
import UserRepo from "../users/users.repo";
import { validateAuth } from "./auth.validation";
import * as bcrypt from "bcrypt";
import TokenRepo from "../tokens/tokens.repo";
import TokenService from "../tokens/tokens.service";
import { UserType } from "@/data/usersMockup";
export type AuthProps = {
  remember_me?: boolean;
  email: string;
  password: string;
};
class AuthService {
  private readonly userRepo: UserRepo = new UserRepo();
  private readonly tokenRepo: TokenRepo = new TokenRepo();
  private readonly tokenService: TokenService = new TokenService();
  async authenticateUser(data: AuthProps) {
    const { errors } = validateAuth(data);
    if (errors.length) return responseError({ code: 400, message: errors });
    const user = await this.userRepo.findByEmail(data.email);
    if (!user) return responseError({ code: 404, message: "User not found" });
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid)
      return responseError({ code: 401, message: "Incorrect password" });
    const token = await this.generateUserToken(user, data.remember_me);
    const userNoPassField = excludeFields(user, ["password"]);

    return responseSuccess({
      code: 200,
      data: { user: userNoPassField, token },
    });
  }

  async generateUserToken(user: UserType, rememberMe?: boolean) {
    const hash = generateId();
    const jwtToken = await this.tokenService.generateToken(
      { key: hash, user_id: user.id },
      { expiresIn: "1d" }
    );

    if (!rememberMe) return jwtToken;

    const existToken = await this.tokenRepo
      .findByUserId(user.id)
      .then((t) => t?.token);
    if (existToken) return existToken;

    const newToken = await this.tokenRepo.store({
      id: crypto.randomUUID(),
      user_id: user.id,
      token: await this.tokenService.generateToken({
        key: generateHash(),
        user_id: user.id,
      }),
      created_at: new Date(),
      updated_at: new Date(),
    });

    return newToken.token;
  }
}

export default AuthService;
