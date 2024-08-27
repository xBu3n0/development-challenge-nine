export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  city: City;
  cityId: string;

  createdAt: Date;
  updatedAt: Date;
}