import { Router } from "express";
import { usersRouters } from "../users/users.controller";
const routes = Router();

routes.use("/users", usersRouters);

export { routes };
