import jwt, { Secret } from "jsonwebtoken";
import { LoginModel } from "./models/login.model";
import { UserAuthModel } from "./models/userAuth.model";

export class AuthService {
  constructor() {}

  async login(login: LoginModel): Promise<string> {
    return new Promise((resolve, reject) => {
      // jwt.sign();
    });
  }

  async verifyAuth(token: string): Promise<UserAuthModel> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_PASSWORD as Secret, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result as UserAuthModel);
      });
    });
  }
}
