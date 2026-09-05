export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactNumber: string;
  uniqueId: string;
  createdAt: string;
  updatedAt: string;
}

export type PatientInput = Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>;
