import { responseError, responseSuccess } from "@/lib/utils";
import TokenRepo, { Tokens } from "./tokens.repo";
import { validateTokenInput } from "./tokens.validation";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "@/config/app";
class TokenService {
  private readonly tokenRepo: TokenRepo = new TokenRepo();
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
      const jwtToken = this.generateToken({ user_id: token.user_id });
      if (!jwtToken)
        return responseError({ code: 500, message: "Can not create token" });
      token.token = jwtToken;
      const storeToken = await this.tokenRepo.store(token);
      return responseSuccess({ code: 201, data: storeToken });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
  async delete(id: string) {
    try {
      const token = await this.tokenRepo.findById(id);
      if (!token) return responseError({ code: 404 });
      const deleteToken = await this.tokenRepo.delete(id);
      return responseSuccess({
        code: 200,
        message: "Deleted",
        data: deleteToken,
      });
    } catch (error) {
      return responseError({ code: 500 });
    }
  }
  private generateToken(payload: any) {
    try {
      if (!payload || SECRET_KEY) return false;
      const token = jwt.sign(payload, SECRET_KEY!, { expiresIn: "30d" });
      return token;
    } catch (error) {
      return false;
    }
  }
}

export default TokenService;
