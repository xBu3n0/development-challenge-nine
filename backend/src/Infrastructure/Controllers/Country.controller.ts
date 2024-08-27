import express from "express";
import CountryInteractorInterface from "@/app/Interactors/CountryInteractor.interface";
import ValidateServiceInterface from "@/app/Services/ValidateService.interface";

export default class CountryController {
  constructor(private readonly countryInteractor: CountryInteractorInterface, private readonly validateService: ValidateServiceInterface) {}

  public async list(req: express.Request, res: express.Response) {
    const countries = await this.countryInteractor.list();

    res.status(200).json(countries);
  }

  public async findById(req: express.Request, res: express.Response) {
    const countryId = req.params.countryId;
    if(!this.validateService.validateUuid(countryId)) {
      res.status(400).end();
      return;
    }

    const country = await this.countryInteractor.findById(countryId);

    if (!country) {
      res.status(404).json({ error: "Country not found" });
    } else {
      res.status(200).json(country);
    }
  }

  public async findByName(req: express.Request, res: express.Response) {
    const countryName = req.params.countryName;

    const country = await this.countryInteractor.findByName(countryName);

    if (!country) {
      res.status(404).json({ error: "Country not found" });
    } else {
      res.status(200).json(country);
    }
  }
}
