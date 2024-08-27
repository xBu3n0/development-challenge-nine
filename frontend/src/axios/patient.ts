"use client";

import { Patient } from '@/interfaces/patient';
import { api } from './api';
import { RegisterPatient } from '@/interfaces/registerPatient';
import { UpdatePatient } from '@/interfaces/updatePatient';
import { FullPatient } from '@/interfaces/fullPatient';

export const patientService = {
  async getAll(): Promise<Patient[]> {
    const response = await api.get(`/patients/`);
    return response.data;
  },

  async register(createPatient: RegisterPatient): Promise<Patient> {
    const response = await api.post("/patients", createPatient);
    return response.data;
  },

  async update(patientId: string, updatePatient: UpdatePatient): Promise<Patient> {
    const response = await api.put(`/patients/${patientId}`, updatePatient);
    return response.data;
  },

  async findById(patientId: string): Promise<FullPatient> {
    const response = await api.get(`/patients/${patientId}`);
    return response.data;
  },

  async delete(patientId: string): Promise<Patient> {
    const response = await api.delete(`/patients/${patientId}`);

    return response.data;
  }
}
