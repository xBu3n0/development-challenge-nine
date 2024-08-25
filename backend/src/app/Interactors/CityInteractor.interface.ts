import express from "express";
import City from "@/app/Entities/City.entity";

export default interface CityInteractorInterface {
  list(): Promise<City[]>;
  findById(CityId: string): Promise<City | null>;
  findByName(CityName: string): Promise<City | null>;
  findByState(stateId: string): Promise<City[]>;
}
