import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

import UserRepositoryInterface from "@/app/Repositories/UserRepository.interface";
import User from "@/app/Entities/User.entity";
import CreateUser from "@/app/Entities/CreateUser.entity";

export class UserRepositoryPrisma implements UserRepositoryInterface {
  constructor(private readonly conn: Prisma.UserDelegate<DefaultArgs>) {}

  public async getAll(): Promise<User[]> {
    return new Promise((res, rej) => rej("Não implementado ADMIN"));
  }

  public findById(id: string): Promise<User | null> {
    return this.conn.findFirst({
      where: {
        id,
      },
    });
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.conn.findFirst({
      where: {
        email,
      },
    });
  }

  public async create(user: CreateUser): Promise<User> {
    return this.conn.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  }
}
