import express from "express";
import StateInteractorInterface from "@/app/Interactors/StateInteractor.interface";
import ValidateServiceInterface from "@/app/Services/ValidateService.interface";

export default class StateController {
  constructor(private readonly stateInteractor: StateInteractorInterface, private readonly validateService: ValidateServiceInterface) {}

  public async list(req: express.Request, res: express.Response) {
    const countries = await this.stateInteractor.list();

    res.status(200).json(countries);
  }

  public async findById(req: express.Request, res: express.Response) {
    const stateId = req.params.stateId;
    if(!this.validateService.validateUuid(stateId)) {
      res.status(400).end();
      return;
    }

    const state = await this.stateInteractor.findById(stateId);

    if (!state) {
      res.status(404).json({ error: "State not found" });
    } else {
      res.status(200).json(state);
    }
  }

  public async findByName(req: express.Request, res: express.Response) {
    const stateName = req.params.stateName;

    const state = await this.stateInteractor.findByName(stateName);

    if (!state) {
      res.status(404).json({ error: "State not found" });
    } else {
      res.status(200).json(state);
    }
  }

  public async findByCountry(req: express.Request, res: express.Response) {
    const countryId = req.params.countryId;
    if(!this.validateService.validateUuid(countryId)) {
      res.status(400).end();
      return;
    }

    const states = await this.stateInteractor.findByCountry(countryId);

    res.status(200).json(states);
  }
}
