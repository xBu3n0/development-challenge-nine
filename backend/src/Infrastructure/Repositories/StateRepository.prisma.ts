import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import StateRepositoryInterface from "@/app/Repositories/StateRepository.interface";
import State from "@/app/Entities/State.entity";

export class StateRepositoryPrisma implements StateRepositoryInterface {
  constructor(private readonly conn: Prisma.StateDelegate<DefaultArgs>) {}

  public getAll(): Promise<State[]> {
    return this.conn.findMany({
      orderBy: {
        name: "asc",
      }
    });
  }

  public findById(id: string): Promise<State | null> {
    return this.conn.findFirst({
      where: {
        id,
      },
    });
  }

  public findByName(name: string): Promise<State | null> {
    return this.conn.findFirst({
      where: {
        name,
      },
    });
  }

  public findByCountry(countryId: string): Promise<State[]> {
    return this.conn.findMany({
      where: {
        countryId,
      },
      orderBy: {
        name: "asc",
      }
    });
  }
}
