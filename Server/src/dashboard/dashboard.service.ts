import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { PatientEntity, VisitEntity } from '../database/entities';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(PatientEntity)
    private readonly patientRepository: Repository<PatientEntity>,
    @InjectRepository(VisitEntity)
    private readonly visitRepository: Repository<VisitEntity>,
  ) {}

  async getStats(user: JwtPayload) {
    const [patients, visits] = await Promise.all([
      this.patientRepository.find({
        where: { clinicId: user.clinicId },
        order: { createdAt: 'DESC' },
      }),
      this.visitRepository.find({
        where: { clinicId: user.clinicId },
        relations: ['patient'],
        order: { visitDate: 'DESC' },
      }),
    ]);

    const now = new Date();
    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const weekAgo = new Date(now);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const monthAgo = new Date(now);
    monthAgo.setDate(monthAgo.getDate() - 30);

    const visitedPatientIds = new Set(visits.map((visit) => visit.patientId));
    const pendingPatients = patients.filter(
      (patient) => !visitedPatientIds.has(patient.id),
    );

    const visitsToday = visits.filter(
      (visit) => visit.visitDate >= startOfToday,
    ).length;

    const visitsThisWeek = visits.filter(
      (visit) => visit.visitDate >= weekAgo,
    ).length;

    const visitsLast30d = visits.filter((visit) => visit.visitDate >= monthAgo);

    const conditionCounts = new Map<string, number>();
    for (const visit of visitsLast30d) {
      conditionCounts.set(
        visit.conditionSlug,
        (conditionCounts.get(visit.conditionSlug) ?? 0) + 1,
      );
    }

    const visitsByCondition = Array.from(conditionCounts.entries()).map(
      ([condition, count]) => ({
        condition,
        label: this.getConditionLabel(condition),
        count,
      }),
    );

    return {
      message: 'Dashboard stats retrieved successfully',
      data: {
        visitsToday,
        pendingFirstVisitCount: pendingPatients.length,
        totalPatients: patients.length,
        visitsThisWeek,
        pendingPatients: pendingPatients.slice(0, 5).map((patient) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          contactNumber: patient.contactNumber,
          uniqueId: patient.uniqueId,
          createdAt: patient.createdAt.toISOString(),
          updatedAt: patient.updatedAt.toISOString(),
        })),
        recentVisits: visits.slice(0, 5).map((visit) => ({
          visit: {
            id: visit.id,
            patientId: visit.patientId,
            condition: visit.conditionSlug,
            vitals: visit.vitals,
            severity: visit.severity,
            notes: visit.notes,
            visitDate: visit.visitDate.toISOString(),
            createdAt: visit.createdAt.toISOString(),
          },
          patient: {
            id: visit.patient.id,
            name: visit.patient.name,
            age: visit.patient.age,
            gender: visit.patient.gender,
            contactNumber: visit.patient.contactNumber,
            uniqueId: visit.patient.uniqueId,
            createdAt: visit.patient.createdAt.toISOString(),
            updatedAt: visit.patient.updatedAt.toISOString(),
          },
        })),
        visitsByCondition,
      },
    };
  }

  private getConditionLabel(slug: string) {
    const labels: Record<string, string> = {
      fever: 'Fever',
      hypertension: 'Hypertension',
      diabetes: 'Diabetes Checkup',
      general: 'General Checkup',
    };

    return labels[slug] ?? slug;
  }
}
