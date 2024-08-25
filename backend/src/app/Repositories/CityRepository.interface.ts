import { PrismaClient } from "@prisma/client";
import City from "@/app/Entities/City.entity";

export default interface CityRepositoryInterface {
  getAll(): Promise<City[]>;
  findById(id: string): Promise<City | null>;
  findByName(name: string): Promise<City | null>;
  findByState(stateId: string): Promise<City[]>;
}
