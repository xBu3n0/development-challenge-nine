import { PrismaClient } from "@prisma/client";
import User from "@/app/Entities/User.entity";
import CreateUser from "@/app/Entities/CreateUser.entity";

export default interface UserRepositoryInterface {
  getAll(): Promise<User[]>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;

  create(user: CreateUser): Promise<User>;
}
