import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import CountryRepositoryInterface from "@/app/Repositories/CountryRepository.interface";
import Country from "@/app/Entities/Country.entity";

export class CountryRepositoryPrisma implements CountryRepositoryInterface {
  constructor(private readonly conn: Prisma.CountryDelegate<DefaultArgs>) {}

  public getAll(): Promise<Country[]> {
    return this.conn.findMany({
      orderBy: {
        name: "asc",
      }
    });
  }

  public findById(id: string): Promise<Country | null> {
    return this.conn.findFirst({
      where: {
        id,
      },
    });
  }

  public findByName(name: string): Promise<Country | null> {
    return this.conn.findFirst({
      where: {
        name,
      },
    });
  }
}
