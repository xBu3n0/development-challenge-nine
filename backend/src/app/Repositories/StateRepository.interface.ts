import { PrismaClient } from "@prisma/client";
import State from "@/app/Entities/State.entity";

export default interface StateRepositoryInterface {
  getAll(): Promise<State[]>;
  findById(id: string): Promise<State | null>;
  findByName(name: string): Promise<State | null>;
  findByCountry(countryId: string): Promise<State[]>;
}
