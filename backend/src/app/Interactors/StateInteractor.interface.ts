import express from "express";
import State from "@/app/Entities/State.entity";

export default interface StateInteractorInterface {
  list(): Promise<State[]>;
  findById(StateId: string): Promise<State | null>;
  findByName(StateName: string): Promise<State | null>;
  findByCountry(countryId: string): Promise<State[]>;
}
