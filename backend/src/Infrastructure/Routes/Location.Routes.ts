import express from "express";
import CountryInteractorInterface from "@/app/Interactors/CountryInteractor.interface";
import CountryController from "../Controllers/Country.controller";
import StateInteractorInterface from "@/app/Interactors/StateInteractor.interface";
import CityInteractorInterface from "@/app/Interactors/CityInteractor.interface";
import StateController from "../Controllers/State.controller";
import CityController from "../Controllers/City.controller";

export function LocationRoutes(
  app: express.Express,
  countryInteractor: CountryInteractorInterface,
  stateInteractor: StateInteractorInterface,
  cityInteractor: CityInteractorInterface,
): void {
  const countryController = new CountryController(countryInteractor);
  const stateController = new StateController(stateInteractor);
  const cityController = new CityController(cityInteractor);

  app.get("/api/countries", countryController.list.bind(countryController));
  app.get("/api/countries/:countryId", countryController.findById.bind(countryController));
  app.get("/api/countries/:countryId/states", stateController.findByCountry.bind(stateController));
  app.get("/api/states/:stateId", stateController.findById.bind(stateController));
  app.get("/api/states/:stateId/cities", cityController.findByState.bind(cityController));
  app.get("/api/cities/:cityId", cityController.findById.bind(cityController));
}
