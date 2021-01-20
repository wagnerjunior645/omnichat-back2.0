import { Router } from "express";
import { authRouter } from "../auth/auth.controller";
import { usersRouters } from "../users/users.controller";
const routes = Router();

routes.use("/login", authRouter);
routes.use("/users", usersRouters);

export { routes };
