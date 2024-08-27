export interface FullPatient {
  id: string;
  name: string;
  birthDate: string;
  email: string;
  
  city: {
    id: string;
    name: string;
    stateId: string;
    state: {
      id: string;
      name: string;
      countryId: string;
      country: {
        id: string;
        name: string;
      }
    }
  };

  cityId: string;

  createdAt: Date;
  updatedAt: Date;
}