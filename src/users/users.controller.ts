import { Router } from "express";
import { Request, Response } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { CreateUsers } from "./models/createUsers.model";
import { UsersService } from "./users.service";
import { authGuard } from "../auth/authGuard.controller";

const usersRouters = Router();

usersRouters.get("", async (req: Request, res: Response) => {
  const usersService = new UsersService();
  const users = await usersService.findAll();
  res.json(users);
});
usersRouters.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const usersService = new UsersService();
    try {
      await usersService.remove(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
usersRouters.put("/:id", async (req: Request, res: Response) => {
  const { user } = req.body;
  const id: number = Number(req.params.id);
  const usersService = new UsersService();
  try {
    await usersService.update(id, user);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
usersRouters.post(
  "",
  celebrate({
    [Segments.BODY]: {
      user: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const usersService = new UsersService();
    const body = req.body as CreateUsers;
    try {
      const createdUser = await usersService.create(body.user, body.password);
      res.status(201).json(createdUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
usersRouters.use(authGuard);
usersRouters.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: any, res: Response) => {
    const id: number = Number(req.params.id);
    const usersService = new UsersService();
    try {
      const findUser = await usersService.find(id);
      res.status(200).json(findUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

export { usersRouters };
