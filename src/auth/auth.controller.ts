import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { LoginModel } from "./models/login.model";

const authRouter = Router();

authRouter.post(
  "",
  celebrate({
    [Segments.BODY]: {
      user: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  async (req: Request, res: Response) => {
    const authService = new AuthService();
    const loginPayload = req.body as LoginModel;
    try {
      const token = await authService.login(loginPayload);
      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export { authRouter };
