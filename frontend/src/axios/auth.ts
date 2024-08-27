"use client";

import { api } from './api';
import Auth from '@/interfaces/auth';

export const authService = {
  async validate(): Promise<Auth> {
    const auth = await api.get("/validate");
    return auth.data;
  },

  async register(createUser: RegisterUser): Promise<Auth> {
    const auth = await api.post("/", createUser);
    return auth.data;
  },

  async logIn(logInUser: LogInUser): Promise<Auth> {
    const result = await api.post("/logIn", logInUser);
    return result.data;
  },

  async logOut(): Promise<void> {
    await api.get("/logOut");
  }
}
