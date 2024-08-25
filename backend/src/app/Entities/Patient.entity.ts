export default interface Patient {
  id: string;
  name: string;
  birthDate: Date;
  email: string;
  cityId: string;
  userId: string;

  createdAt: Date;
  updatedAt: Date;
}
