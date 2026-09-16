import { Gender } from '../../common/enums/gender.enum';
import { Severity } from '../../common/enums/severity.enum';
import type { VitalSignRecord } from '../entities';

export const DEMO_PATIENTS = [
  {
    uniqueId: 'PT-001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: Gender.Male,
    contactNumber: '9876543210',
    address: '12 MG Road, Andheri West, Mumbai',
    createdAt: '2026-08-15T09:00:00.000Z',
  },
  {
    uniqueId: 'PT-002',
    name: 'Priya Sharma',
    age: 32,
    gender: Gender.Female,
    contactNumber: '9123456780',
    address: '45 Park Street, Kolkata',
    createdAt: '2026-08-20T11:30:00.000Z',
  },
  {
    uniqueId: 'PT-003',
    name: 'Anil Mehta',
    age: 58,
    gender: Gender.Male,
    contactNumber: '9988776655',
    address: '8 Civil Lines, Jaipur',
    createdAt: '2026-08-28T08:15:00.000Z',
  },
  {
    uniqueId: 'PT-004',
    name: 'Sunita Desai',
    age: 41,
    gender: Gender.Female,
    contactNumber: '9012345678',
    address: '22 Law Garden, Ahmedabad',
    createdAt: '2026-09-01T10:00:00.000Z',
  },
  {
    uniqueId: 'PT-005',
    name: 'Vikram Singh',
    age: 67,
    gender: Gender.Male,
    contactNumber: '9822334455',
    address: '19 Sector 17, Chandigarh',
    createdAt: '2026-09-02T14:30:00.000Z',
  },
  {
    uniqueId: 'PT-006',
    name: 'Meera Patel',
    age: 29,
    gender: Gender.Female,
    contactNumber: '9765432109',
    address: '7 CG Road, Navrangpura, Ahmedabad',
    createdAt: '2026-09-03T09:15:00.000Z',
  },
  {
    uniqueId: 'PT-007',
    name: 'Arjun Nair',
    age: 52,
    gender: Gender.Male,
    contactNumber: '9898989898',
    address: '31 Marine Drive, Kochi',
    createdAt: '2026-09-04T11:00:00.000Z',
  },
  {
    uniqueId: 'PT-008',
    name: 'Kavita Rao',
    age: 36,
    gender: Gender.Female,
    contactNumber: '9111222333',
    address: '14 Banjara Hills, Hyderabad',
    createdAt: '2026-09-05T08:45:00.000Z',
  },
  {
    uniqueId: 'PT-009',
    name: 'Deepak Joshi',
    age: 49,
    gender: Gender.Male,
    contactNumber: '9334455667',
    address: '9 FC Road, Pune',
    createdAt: '2026-09-06T16:20:00.000Z',
  },
  {
    uniqueId: 'PT-010',
    name: 'Lakshmi Iyer',
    age: 61,
    gender: Gender.Female,
    contactNumber: '9445566778',
    address: '5 Adyar, Chennai',
    createdAt: '2026-09-07T13:10:00.000Z',
  },
  {
    uniqueId: 'PT-011',
    name: 'Rohan Gupta',
    age: 24,
    gender: Gender.Male,
    contactNumber: '9556677889',
    address: '18 Connaught Place, New Delhi',
    createdAt: '2026-09-08T10:30:00.000Z',
  },
  {
    uniqueId: 'PT-012',
    name: 'Neha Kulkarni',
    age: 38,
    gender: Gender.Female,
    contactNumber: '9667788990',
    address: '27 Koregaon Park, Pune',
    createdAt: '2026-09-09T15:00:00.000Z',
  },
];

export type DemoVisitSeed = {
  patientUniqueId: string;
  conditionSlug: string;
  visitDate: string;
  severity: Severity;
  notes: string;
  vitals: VitalSignRecord[];
};

function fever(values: {
  temperature: number;
  spo2: number;
  pulse: number;
  bloodPressure: string;
  duration: number;
  chills: boolean;
}): VitalSignRecord[] {
  return [
    { key: 'temperature', label: 'Temperature', value: values.temperature, unit: '°F' },
    { key: 'spo2', label: 'Oxygen Saturation', value: values.spo2, unit: '%' },
    { key: 'pulse', label: 'Pulse Rate', value: values.pulse, unit: 'bpm' },
    { key: 'bloodPressure', label: 'Blood Pressure', value: values.bloodPressure, unit: 'mmHg' },
    { key: 'duration', label: 'Duration of Fever', value: values.duration, unit: 'days' },
    { key: 'chills', label: 'Chills or Sweating', value: values.chills },
  ];
}

function hypertension(values: {
  systolic: number;
  diastolic: number;
  pulse: number;
  weight: number;
  dizziness: boolean;
  medications: string;
}): VitalSignRecord[] {
  return [
    { key: 'systolic', label: 'Systolic BP', value: values.systolic, unit: 'mmHg' },
    { key: 'diastolic', label: 'Diastolic BP', value: values.diastolic, unit: 'mmHg' },
    { key: 'pulse', label: 'Pulse Rate', value: values.pulse, unit: 'bpm' },
    { key: 'weight', label: 'Weight', value: values.weight, unit: 'kg' },
    { key: 'dizziness', label: 'Dizziness', value: values.dizziness },
    { key: 'medications', label: 'Medications Taken', value: values.medications },
  ];
}

function diabetes(values: {
  fastingGlucose: number;
  postMealGlucose: number;
  hba1c: number;
  weight: number;
  numbness: boolean;
}): VitalSignRecord[] {
  return [
    { key: 'fastingGlucose', label: 'Fasting Blood Glucose', value: values.fastingGlucose, unit: 'mg/dL' },
    { key: 'postMealGlucose', label: 'Post-meal Glucose', value: values.postMealGlucose, unit: 'mg/dL' },
    { key: 'hba1c', label: 'HbA1c', value: values.hba1c, unit: '%' },
    { key: 'weight', label: 'Weight', value: values.weight, unit: 'kg' },
    { key: 'numbness', label: 'Numbness/Tingling', value: values.numbness },
  ];
}

function general(values: {
  temperature: number;
  bloodPressure: string;
  pulse: number;
  weight: number;
  height: number;
  spo2: number;
  chiefComplaint: string;
}): VitalSignRecord[] {
  return [
    { key: 'temperature', label: 'Temperature', value: values.temperature, unit: '°F' },
    { key: 'bloodPressure', label: 'Blood Pressure', value: values.bloodPressure, unit: 'mmHg' },
    { key: 'pulse', label: 'Pulse Rate', value: values.pulse, unit: 'bpm' },
    { key: 'weight', label: 'Weight', value: values.weight, unit: 'kg' },
    { key: 'height', label: 'Height', value: values.height, unit: 'cm' },
    { key: 'spo2', label: 'Oxygen Saturation', value: values.spo2, unit: '%' },
    { key: 'chiefComplaint', label: 'Chief Complaint', value: values.chiefComplaint },
  ];
}

function asthma(values: {
  respiratoryRate: number;
  spo2: number;
  peakFlow: number;
  pulse: number;
  wheezing: boolean;
  inhalerUsed: boolean;
}): VitalSignRecord[] {
  return [
    { key: 'respiratoryRate', label: 'Respiratory Rate', value: values.respiratoryRate, unit: 'breaths/min' },
    { key: 'spo2', label: 'Oxygen Saturation', value: values.spo2, unit: '%' },
    { key: 'peakFlow', label: 'Peak Expiratory Flow', value: values.peakFlow, unit: 'L/min' },
    { key: 'pulse', label: 'Pulse Rate', value: values.pulse, unit: 'bpm' },
    { key: 'wheezing', label: 'Wheezing Present', value: values.wheezing },
    { key: 'inhalerUsed', label: 'Inhaler Used Today', value: values.inhalerUsed },
  ];
}

function cardiac(values: {
  systolic: number;
  diastolic: number;
  pulse: number;
  spo2: number;
  chestPainScore: number;
  shortnessOfBreath: boolean;
  ecgNotes: string;
}): VitalSignRecord[] {
  return [
    { key: 'systolic', label: 'Systolic BP', value: values.systolic, unit: 'mmHg' },
    { key: 'diastolic', label: 'Diastolic BP', value: values.diastolic, unit: 'mmHg' },
    { key: 'pulse', label: 'Pulse Rate', value: values.pulse, unit: 'bpm' },
    { key: 'spo2', label: 'Oxygen Saturation', value: values.spo2, unit: '%' },
    { key: 'chestPainScore', label: 'Chest Pain Score', value: values.chestPainScore, unit: '0-10' },
    { key: 'shortnessOfBreath', label: 'Shortness of Breath', value: values.shortnessOfBreath },
    { key: 'ecgNotes', label: 'ECG / Clinical Notes', value: values.ecgNotes },
  ];
}

function anemia(values: {
  hemoglobin: number;
  pulse: number;
  bloodPressure: string;
  weight: number;
  pallor: boolean;
  fatigue: boolean;
}): VitalSignRecord[] {
  return [
    { key: 'hemoglobin', label: 'Hemoglobin', value: values.hemoglobin, unit: 'g/dL' },
    { key: 'pulse', label: 'Pulse Rate', value: values.pulse, unit: 'bpm' },
    { key: 'bloodPressure', label: 'Blood Pressure', value: values.bloodPressure, unit: 'mmHg' },
    { key: 'weight', label: 'Weight', value: values.weight, unit: 'kg' },
    { key: 'pallor', label: 'Pallor Present', value: values.pallor },
    { key: 'fatigue', label: 'Fatigue Reported', value: values.fatigue },
  ];
}

export const DEMO_VISITS: DemoVisitSeed[] = [
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'hypertension',
    visitDate: '2026-08-15T09:00:00.000Z',
    severity: Severity.Moderate,
    notes: 'Patient reports elevated BP. Continue monitoring and review medications.',
    vitals: hypertension({
      systolic: 142,
      diastolic: 88,
      pulse: 78,
      weight: 81,
      dizziness: true,
      medications: 'Amlodipine 5mg once daily',
    }),
  },
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'general',
    visitDate: '2026-08-25T10:00:00.000Z',
    severity: Severity.Mild,
    notes: 'Routine follow-up. Patient reports feeling well.',
    vitals: general({
      temperature: 98.4,
      bloodPressure: '118/76',
      pulse: 72,
      weight: 80,
      height: 172,
      spo2: 98,
      chiefComplaint: 'Routine wellness check',
    }),
  },
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'fever',
    visitDate: '2026-09-10T09:30:00.000Z',
    severity: Severity.Moderate,
    notes: 'Viral fever with chills. Advised rest, fluids, and antipyretics.',
    vitals: fever({
      temperature: 101.2,
      spo2: 97,
      pulse: 92,
      bloodPressure: '124/80',
      duration: 2,
      chills: true,
    }),
  },
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'diabetes',
    visitDate: '2026-09-11T11:00:00.000Z',
    severity: Severity.Moderate,
    notes: 'New diabetes screening. HbA1c elevated; diet and Metformin started.',
    vitals: diabetes({
      fastingGlucose: 126,
      postMealGlucose: 168,
      hba1c: 6.8,
      weight: 81,
      numbness: false,
    }),
  },
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'asthma',
    visitDate: '2026-09-13T14:15:00.000Z',
    severity: Severity.Mild,
    notes: 'Seasonal wheeze. Inhaler technique reviewed.',
    vitals: asthma({
      respiratoryRate: 18,
      spo2: 97,
      peakFlow: 410,
      pulse: 84,
      wheezing: true,
      inhalerUsed: false,
    }),
  },
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'cardiac',
    visitDate: '2026-09-14T16:00:00.000Z',
    severity: Severity.Moderate,
    notes: 'Occasional chest tightness on exertion. ECG sinus rhythm, no ST changes.',
    vitals: cardiac({
      systolic: 138,
      diastolic: 86,
      pulse: 90,
      spo2: 97,
      chestPainScore: 3,
      shortnessOfBreath: true,
      ecgNotes: 'Sinus rhythm. No acute ischemic changes.',
    }),
  },
  {
    patientUniqueId: 'PT-001',
    conditionSlug: 'anemia',
    visitDate: '2026-09-16T09:00:00.000Z',
    severity: Severity.Mild,
    notes: 'Mild fatigue. Hemoglobin low-normal; iron-rich diet advised.',
    vitals: anemia({
      hemoglobin: 11.4,
      pulse: 86,
      bloodPressure: '118/74',
      weight: 80,
      pallor: false,
      fatigue: true,
    }),
  },
  {
    patientUniqueId: 'PT-002',
    conditionSlug: 'fever',
    visitDate: '2026-08-20T11:30:00.000Z',
    severity: Severity.Moderate,
    notes: 'Fever subsiding. Follow up in 3 days if symptoms persist.',
    vitals: fever({
      temperature: 101.2,
      spo2: 97,
      pulse: 92,
      bloodPressure: '112/70',
      duration: 3,
      chills: true,
    }),
  },
  {
    patientUniqueId: 'PT-002',
    conditionSlug: 'diabetes',
    visitDate: '2026-09-14T11:00:00.000Z',
    severity: Severity.Mild,
    notes: 'Screening test — prediabetic range. Lifestyle counseling provided.',
    vitals: diabetes({
      fastingGlucose: 105,
      postMealGlucose: 142,
      hba1c: 5.9,
      weight: 62,
      numbness: false,
    }),
  },
  {
    patientUniqueId: 'PT-003',
    conditionSlug: 'diabetes',
    visitDate: '2026-08-28T14:00:00.000Z',
    severity: Severity.Moderate,
    notes: 'HbA1c slightly elevated. Adjust diet plan and recheck in 4 weeks.',
    vitals: diabetes({
      fastingGlucose: 126,
      postMealGlucose: 180,
      hba1c: 6.8,
      weight: 82,
      numbness: true,
    }),
  },
  {
    patientUniqueId: 'PT-003',
    conditionSlug: 'hypertension',
    visitDate: '2026-09-06T10:00:00.000Z',
    severity: Severity.Moderate,
    notes: 'Follow-up for combined diabetes and hypertension management.',
    vitals: hypertension({
      systolic: 138,
      diastolic: 86,
      pulse: 76,
      weight: 82,
      dizziness: false,
      medications: 'Amlodipine 5mg, Metformin 500mg',
    }),
  },
  {
    patientUniqueId: 'PT-005',
    conditionSlug: 'hypertension',
    visitDate: '2026-09-02T15:00:00.000Z',
    severity: Severity.Severe,
    notes: 'BP significantly elevated. Medication adjustment recommended.',
    vitals: hypertension({
      systolic: 156,
      diastolic: 94,
      pulse: 84,
      weight: 88,
      dizziness: true,
      medications: 'Losartan 50mg, Hydrochlorothiazide 12.5mg',
    }),
  },
  {
    patientUniqueId: 'PT-005',
    conditionSlug: 'asthma',
    visitDate: '2026-09-12T10:30:00.000Z',
    severity: Severity.Moderate,
    notes: 'Mild asthma exacerbation. Inhaler prescribed and technique reviewed.',
    vitals: asthma({
      respiratoryRate: 22,
      spo2: 96,
      peakFlow: 320,
      pulse: 88,
      wheezing: true,
      inhalerUsed: true,
    }),
  },
  {
    patientUniqueId: 'PT-006',
    conditionSlug: 'fever',
    visitDate: '2026-09-03T11:15:00.000Z',
    severity: Severity.Moderate,
    notes: 'Low-grade fever. Advised rest and hydration.',
    vitals: fever({
      temperature: 100.4,
      spo2: 98,
      pulse: 88,
      bloodPressure: '110/68',
      duration: 1,
      chills: false,
    }),
  },
  {
    patientUniqueId: 'PT-007',
    conditionSlug: 'diabetes',
    visitDate: '2026-09-04T09:45:00.000Z',
    severity: Severity.Mild,
    notes: 'Glucose levels improved since last visit.',
    vitals: diabetes({
      fastingGlucose: 118,
      postMealGlucose: 152,
      hba1c: 6.2,
      weight: 78,
      numbness: false,
    }),
  },
  {
    patientUniqueId: 'PT-008',
    conditionSlug: 'general',
    visitDate: '2026-09-05T14:00:00.000Z',
    severity: Severity.Mild,
    notes: 'Annual wellness check. All vitals normal.',
    vitals: general({
      temperature: 98.6,
      bloodPressure: '120/80',
      pulse: 74,
      weight: 65,
      height: 162,
      spo2: 99,
      chiefComplaint: 'Annual checkup',
    }),
  },
  {
    patientUniqueId: 'PT-008',
    conditionSlug: 'cardiac',
    visitDate: '2026-09-10T14:00:00.000Z',
    severity: Severity.Moderate,
    notes: 'Chest discomfort on exertion. Cardiology referral suggested.',
    vitals: cardiac({
      systolic: 138,
      diastolic: 86,
      pulse: 94,
      spo2: 97,
      chestPainScore: 4,
      shortnessOfBreath: true,
      ecgNotes: 'Sinus tachycardia. No ST changes.',
    }),
  },
  {
    patientUniqueId: 'PT-009',
    conditionSlug: 'fever',
    visitDate: '2026-09-07T08:30:00.000Z',
    severity: Severity.Moderate,
    notes: 'High fever with chills. Prescribed antipyretics.',
    vitals: fever({
      temperature: 102.1,
      spo2: 96,
      pulse: 96,
      bloodPressure: '128/82',
      duration: 2,
      chills: true,
    }),
  },
  {
    patientUniqueId: 'PT-010',
    conditionSlug: 'diabetes',
    visitDate: '2026-09-08T13:20:00.000Z',
    severity: Severity.Severe,
    notes: 'Poor glycemic control. Refer to dietician.',
    vitals: diabetes({
      fastingGlucose: 145,
      postMealGlucose: 210,
      hba1c: 7.4,
      weight: 71,
      numbness: true,
    }),
  },
  {
    patientUniqueId: 'PT-011',
    conditionSlug: 'anemia',
    visitDate: '2026-09-08T09:15:00.000Z',
    severity: Severity.Moderate,
    notes: 'Moderate iron-deficiency anemia. Iron supplementation started.',
    vitals: anemia({
      hemoglobin: 9.2,
      pulse: 102,
      bloodPressure: '110/70',
      weight: 54,
      pallor: true,
      fatigue: true,
    }),
  },
  {
    patientUniqueId: 'PT-012',
    conditionSlug: 'fever',
    visitDate: '2026-09-11T09:30:00.000Z',
    severity: Severity.Mild,
    notes: 'Mild viral fever. Symptomatic treatment advised.',
    vitals: fever({
      temperature: 99.8,
      spo2: 99,
      pulse: 80,
      bloodPressure: '114/72',
      duration: 1,
      chills: false,
    }),
  },
  {
    patientUniqueId: 'PT-007',
    conditionSlug: 'general',
    visitDate: '2026-09-16T10:30:00.000Z',
    severity: Severity.Mild,
    notes: 'Routine diabetes management follow-up. Vitals stable.',
    vitals: general({
      temperature: 98.4,
      bloodPressure: '124/78',
      pulse: 70,
      weight: 77,
      height: 175,
      spo2: 98,
      chiefComplaint: 'Diabetes follow-up',
    }),
  },
];
