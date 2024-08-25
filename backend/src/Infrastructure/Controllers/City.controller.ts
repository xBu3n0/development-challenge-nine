import express from "express";
import CityInteractorInterface from "@/app/Interactors/CityInteractor.interface";

export default class CityController {
  constructor(private readonly cityInteractor: CityInteractorInterface) {}

  public async list(req: express.Request, res: express.Response) {
    const countries = await this.cityInteractor.list();

    res.status(200).json(countries);
  }

  public async findById(req: express.Request, res: express.Response) {
    const cityId = req.params.cityId;

    const city = await this.cityInteractor.findById(cityId);

    if (!city) {
      res.status(404).json({ error: "City not found" });
    } else {
      res.status(200).json(city);
    }
  }

  public async findByName(req: express.Request, res: express.Response) {
    const cityName = req.params.cityName;

    const city = await this.cityInteractor.findByName(cityName);

    if (!city) {
      res.status(404).json({ error: "City not found" });
    } else {
      res.status(200).json(city);
    }
  }

  public async findByState(req: express.Request, res: express.Response) {
    const stateId = req.params.stateId;

    const cities = await this.cityInteractor.findByState(stateId);

    return res.status(200).json(cities);
  }
}
