import AuthInteractorInterface from "@/app/Interactors/AuthInteractor.interface";
import LogInUser from "@/app/Entities/LogInUser.entity";
import express from "express";
import { signIn, signOut } from "./../../Validation/jwt";
import CreateUser from "./../../app/Entities/CreateUser.entity";

export default class AuthController {
  constructor(private readonly authInteractor: AuthInteractorInterface) {}

  public validate(req: express.Request, res: express.Response) {
    // O middleware fará a validação
    res.status(200).json({});
  }

  public async logIn(req: express.Request, res: express.Response) {
    const logInUser = req.body as LogInUser;

    const user = await this.authInteractor.signIn(logInUser);

    if (!user) {
      res.status(401);
      return;
    }

    signIn({ id: user.id, email: user.email }, res);

    res.status(200).json({});
  }

  async create(req: express.Request, res: express.Response) {
    const newUser = req.body as CreateUser;

    try {
      const user = await this.authInteractor.create(newUser);
      signIn({ id: user.id, email: user.email }, res);

      res.status(201).json(user);
    } catch (err) {
      res.status(409).json({
        errors: { email: "This email is already in use" },
      });
    }
  }

  public logOut(req: express.Request, res: express.Response) {
    signOut(res);

    res.status(200);
  }
}
