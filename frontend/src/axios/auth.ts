"use client";

import { api } from './api';
import Auth from '@/interfaces/auth';

export const authService = {
  async validate(): Promise<Auth> {
    const auth = await api.get("/api/validate");
    return auth.data;
  },

  async register(createUser: RegisterUser): Promise<Auth> {
    const auth = await api.post("/api/", createUser);
    return auth.data;
  },

  async logIn(logInUser: LogInUser): Promise<Auth> {
    const result = await api.post("/api/logIn", logInUser);
    return result.data;
  },

  async logOut(): Promise<void> {
    await api.get("/api/logOut");
  }
}
