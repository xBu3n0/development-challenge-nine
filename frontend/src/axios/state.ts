"use client";

import { api } from './api';

export const stateService = {
  async getByCountry(countryId: string): Promise<State[]> {
    const response = await api.get(`/api/countries/${countryId}/states`);
    return response.data;
  },
}
