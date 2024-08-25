import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import CityRepositoryInterface from "@/app/Repositories/CityRepository.interface";
import City from "@/app/Entities/City.entity";

export class CityRepositoryPrisma implements CityRepositoryInterface {
  constructor(private readonly conn: Prisma.CityDelegate<DefaultArgs>) {}

  public getAll(): Promise<City[]> {
    return this.conn.findMany();
  }

  public findById(id: string): Promise<City | null> {
    return this.conn.findFirst({
      where: {
        id,
      },
    });
  }

  public findByName(name: string): Promise<City | null> {
    return this.conn.findFirst({
      where: {
        name,
      },
    });
  }

  public findByState(stateId: string): Promise<City[]> {
    return this.conn.findMany({
      where: {
        stateId,
      },
    });
  }
}
