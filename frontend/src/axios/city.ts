"use client";

import { api } from './api';

export const cityService = {
  async getByState(stateId: string): Promise<City[]> {
    const response = await api.get(`/api/states/${stateId}/cities`);
    return response.data;
  },
}
