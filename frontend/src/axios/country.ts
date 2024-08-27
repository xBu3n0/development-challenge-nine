"use client";

import { api } from './api';

export const countryService = {
  async getAll(): Promise<Country[]> {
    const response = await api.get(`/api/countries/`);
    return response.data;
  },
}
