import { City } from "@prisma/client";

export default interface Patient {
  id: string;
  name: string;
  birthDate: Date;
  email: string;
  city: City;
  cityId: string;
  userId: string;

  createdAt: Date;
  updatedAt: Date;
}
