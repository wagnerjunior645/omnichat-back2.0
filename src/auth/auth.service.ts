import jwt, { Secret } from "jsonwebtoken";
import { Users } from "../config/fake.repository";
import { UsersService } from "../users/users.service";
import { LoginModel } from "./models/login.model";
import { UserAuthModel } from "./models/userAuth.model";

export class AuthService {
  usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  async login(login: LoginModel): Promise<string> {
    const user = await this.usersService.findByUsername(login.user);
    if (user.password !== login.password) {
      throw new Error("Usuário ou senha errados.");
    }
    return new Promise((resolve, reject) => {
      jwt.sign(
        { user: user.user, id: user.id },
        process.env.JWT_PASSWORD as Secret,
        (err: any, result: any) => {
          if (err) {
            return reject({
              message: "Ocorreu um error na assinatura do usuário.",
            });
          }
          resolve(result as string);
        }
      );
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
