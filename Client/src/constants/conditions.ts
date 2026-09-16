import type { ConditionType } from '@/types';

export interface VitalFieldDef {
  key: string;
  label: string;
  type: 'number' | 'text' | 'boolean';
  unit?: string;
  placeholder?: string;
}

export const CONDITIONS: Record<ConditionType, { label: string; fields: VitalFieldDef[] }> = {
  fever: {
    label: 'Fever',
    fields: [
      { key: 'temperature', label: 'Temperature', type: 'number', unit: '°F' },
      { key: 'spo2', label: 'Oxygen Saturation', type: 'number', unit: '%' },
      { key: 'pulse', label: 'Pulse Rate', type: 'number', unit: 'bpm' },
      { key: 'bloodPressure', label: 'Blood Pressure', type: 'text', unit: 'mmHg' },
      { key: 'duration', label: 'Duration of Fever', type: 'number', unit: 'days' },
      { key: 'chills', label: 'Chills or Sweating', type: 'boolean' },
    ],
  },
  hypertension: {
    label: 'Hypertension',
    fields: [
      { key: 'systolic', label: 'Systolic BP', type: 'number', unit: 'mmHg' },
      { key: 'diastolic', label: 'Diastolic BP', type: 'number', unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', type: 'number', unit: 'bpm' },
      { key: 'weight', label: 'Weight', type: 'number', unit: 'kg' },
      { key: 'dizziness', label: 'Dizziness', type: 'boolean' },
      { key: 'medications', label: 'Medications Taken', type: 'text' },
    ],
  },
  diabetes: {
    label: 'Diabetes Checkup',
    fields: [
      { key: 'fastingGlucose', label: 'Fasting Blood Glucose', type: 'number', unit: 'mg/dL' },
      { key: 'postMealGlucose', label: 'Post-meal Glucose', type: 'number', unit: 'mg/dL' },
      { key: 'hba1c', label: 'HbA1c', type: 'number', unit: '%' },
      { key: 'weight', label: 'Weight', type: 'number', unit: 'kg' },
      { key: 'numbness', label: 'Numbness/Tingling', type: 'boolean' },
    ],
  },
  general: {
    label: 'General Checkup',
    fields: [
      { key: 'temperature', label: 'Temperature', type: 'number', unit: '°F' },
      { key: 'bloodPressure', label: 'Blood Pressure', type: 'text', unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', type: 'number', unit: 'bpm' },
      { key: 'weight', label: 'Weight', type: 'number', unit: 'kg' },
      { key: 'height', label: 'Height', type: 'number', unit: 'cm' },
      { key: 'spo2', label: 'Oxygen Saturation', type: 'number', unit: '%' },
      { key: 'chiefComplaint', label: 'Chief Complaint', type: 'text' },
    ],
  },
  asthma: {
    label: 'Asthma',
    fields: [
      { key: 'respiratoryRate', label: 'Respiratory Rate', type: 'number', unit: 'breaths/min' },
      { key: 'spo2', label: 'Oxygen Saturation', type: 'number', unit: '%' },
      { key: 'peakFlow', label: 'Peak Expiratory Flow', type: 'number', unit: 'L/min' },
      { key: 'pulse', label: 'Pulse Rate', type: 'number', unit: 'bpm' },
      { key: 'wheezing', label: 'Wheezing Present', type: 'boolean' },
      { key: 'inhalerUsed', label: 'Inhaler Used Today', type: 'boolean' },
    ],
  },
  cardiac: {
    label: 'Cardiac Checkup',
    fields: [
      { key: 'systolic', label: 'Systolic BP', type: 'number', unit: 'mmHg' },
      { key: 'diastolic', label: 'Diastolic BP', type: 'number', unit: 'mmHg' },
      { key: 'pulse', label: 'Pulse Rate', type: 'number', unit: 'bpm' },
      { key: 'spo2', label: 'Oxygen Saturation', type: 'number', unit: '%' },
      { key: 'chestPainScore', label: 'Chest Pain Score', type: 'number', unit: '0-10' },
      { key: 'shortnessOfBreath', label: 'Shortness of Breath', type: 'boolean' },
      { key: 'ecgNotes', label: 'ECG / Clinical Notes', type: 'text' },
    ],
  },
  anemia: {
    label: 'Anemia',
    fields: [
      { key: 'hemoglobin', label: 'Hemoglobin', type: 'number', unit: 'g/dL' },
      { key: 'pulse', label: 'Pulse Rate', type: 'number', unit: 'bpm' },
      { key: 'bloodPressure', label: 'Blood Pressure', type: 'text', unit: 'mmHg' },
      { key: 'weight', label: 'Weight', type: 'number', unit: 'kg' },
      { key: 'pallor', label: 'Pallor Present', type: 'boolean' },
      { key: 'fatigue', label: 'Fatigue Reported', type: 'boolean' },
    ],
  },
};
