import { Router } from "express";
import { Request, Response } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import { CreateUsers } from "./models/createUsers.model";
import { FakeRepository } from "../config/fake.repository";

const usersRouters = Router();

usersRouters.get("", async (req: Request, res: Response) => {
  const fakeRepository = new FakeRepository();
  const users = await fakeRepository.findAll();
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
    const fakeRepository = new FakeRepository();
    try {
      await fakeRepository.remove(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
usersRouters.put(
  "/:id",
  async (req: Request, res: Response) => {
    const { user } = req.body;
    const id: number = Number(req.params.id);
    const fakeRepository = new FakeRepository();
    try {
      await fakeRepository.update(id, user);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
usersRouters.post(
  "",
  celebrate({
    [Segments.BODY]: {
      user: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const fakeRepository = new FakeRepository();
    const body = req.body as CreateUsers;
    try {
      const createdUser = await fakeRepository.create(body.user, body.password);
      res.status(201).json(createdUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);
usersRouters.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.number().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const id: number = Number(req.params.id);
    const fakeRepository = new FakeRepository();
    try {
      const findUser = await fakeRepository.find(id);
      res.status(200).json(findUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

export { usersRouters };
