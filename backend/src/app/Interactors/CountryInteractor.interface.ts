import express from "express";
import Country from "@/app/Entities/Country.entity";

export default interface CountryInteractorInterface {
  list(): Promise<Country[]>;
  findById(countryId: string): Promise<Country | null>;
  findByName(countryName: string): Promise<Country | null>;
}
