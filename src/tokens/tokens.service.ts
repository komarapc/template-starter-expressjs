import { debugError, responseError, responseSuccess } from "@/lib/utils";
import TokenRepo, { Tokens } from "./tokens.repo";
import { validateTokenInput } from "./tokens.validation";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@/config/app";
import * as crypto from "crypto";
import UserRepo from "../users/users.repo";
export type TokenPayloads = {
  key: string;
  user_id: string;
};
class TokenService {
  private readonly tokenRepo: TokenRepo = new TokenRepo();
  private readonly userRepo: UserRepo = new UserRepo();
  async findAll() {
    try {
      const tokens = await this.tokenRepo.findAll();
      return responseSuccess({ code: 200, data: { tokens } });
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
      const token = await this.tokenRepo.findById(id);
      if (!token) return responseError({ code: 404 });
      return responseSuccess({ code: 200, data: token });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
  async upsert(token: Tokens) {
    try {
      const errors = validateTokenInput(token);
      if (errors.length) return responseError({ code: 400, message: errors });
      const userExist = await this.userRepo.findById(token.user_id);
      if (!userExist)
        return responseError({ code: 404, message: "User not found" });
      const hash = crypto
        .createHash("sha256")
        .update(crypto.randomUUID())
        .digest("hex");
      const jwtToken = await this.generateToken({
        key: hash,
        user_id: token.user_id,
      });
      if (!jwtToken)
        return responseError({ code: 500, message: "Can not create token" });
      token.id = crypto.randomUUID();
      token.token = jwtToken;
      const storeToken = await this.tokenRepo.store(token);
      return responseSuccess({ code: 201, data: storeToken });
    } catch (error) {
      debugError(error);
      return responseError({ code: 500 });
    }
  }
  async delete(id: string) {
    try {
      const token = await this.tokenRepo.findById(id);
      if (!token) return responseError({ code: 404 });
      await this.tokenRepo.delete(id);
      return responseSuccess({ code: 200, message: "Deleted" });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
  async generateToken(payload: TokenPayloads, options?: jwt.SignOptions) {
    const token = jwt.sign(payload, SECRET_KEY!, options);
    return token;
  }
}

export default TokenService;
