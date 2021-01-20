import { NextFunction, Router } from "express";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";

const authGuard = Router();

authGuard.use( async (req: Request, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers['authorization'];
  if (!bearerHeader) {
      return res.status(403).send();
  }
  const [, token] = bearerHeader.split(' ');
  const authService = new AuthService();
  try{
    const user = await authService.verifyAuth(token);
    res.locals.user = user;
    next();
  }catch(err){
      res.status(403).send();
  }
});

export { authGuard };
