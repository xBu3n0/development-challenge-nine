import AuthInteractorInterface from "@/app/Interactors/AuthInteractor.interface";
import LogInUser from "@/app/Entities/LogInUser.entity";
import express from "express";
import { signIn, signOut } from "./../../Validation/jwt";
import CreateUser from "./../../app/Entities/CreateUser.entity";
import ValidateServiceInterface from "@/app/Services/ValidateService.interface";

export default class AuthController {
  constructor(private readonly authInteractor: AuthInteractorInterface, private readonly validateService: ValidateServiceInterface) {}

  public validate(req: express.Request, res: express.Response) {
    // O middleware fará a validação
    res.status(200).json(req.auth);
  }

  public async logIn(req: express.Request, res: express.Response) {
    const logInUser = req.body as LogInUser;


    const user = await this.authInteractor.signIn(logInUser);

    if (!user) {
      res.status(401).end();
      return;
    }

    signIn({ id: user.id, email: user.email }, res);

    res.status(200).json({ id: user.id, email: user.email });
  }

  async create(req: express.Request, res: express.Response) {
    const newUser = req.body as CreateUser;
    
    if(!this.validateService.validateCreateUser(newUser)) {
      res.status(400).end();
      return;
    }

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

    res.status(200).end();
  }
}
