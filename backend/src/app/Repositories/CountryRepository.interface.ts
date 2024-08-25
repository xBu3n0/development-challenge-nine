import { PrismaClient } from "@prisma/client";
import Country from "@/app/Entities/Country.entity";

export default interface CountryRepositoryInterface {
  getAll(): Promise<Country[]>;
  findById(id: string): Promise<Country | null>;
  findByName(name: string): Promise<Country | null>;
}
