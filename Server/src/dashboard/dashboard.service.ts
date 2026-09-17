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

    const weeklyVisitRhythm = this.buildWeeklyVisitRhythm(visits, now);
    const lastVisit = visits[0];
    const lastVisitSummary = lastVisit
      ? this.formatLastVisitSummary(lastVisit.patient?.name, lastVisit.visitDate, now)
      : null;

    return {
      message: 'Dashboard stats retrieved successfully',
      data: {
        visitsToday,
        pendingFirstVisitCount: pendingPatients.length,
        totalPatients: patients.length,
        visitsThisWeek,
        visitsIn30Days: visitsLast30d.length,
        pendingPatients: pendingPatients.slice(0, 3).map((patient) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          gender: patient.gender,
          contactNumber: patient.contactNumber,
          address: patient.address ?? '',
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
            address: visit.patient.address ?? '',
            uniqueId: visit.patient.uniqueId,
            createdAt: visit.patient.createdAt.toISOString(),
            updatedAt: visit.patient.updatedAt.toISOString(),
          },
        })),
        visitsByCondition,
        weeklyVisitRhythm,
        lastVisitSummary,
      },
    };
  }

  private buildWeeklyVisitRhythm(visits: VisitEntity[], now: Date) {
    const weeklyMap = new Map<string, Record<string, number>>();
    const weekMs = 7 * 24 * 60 * 60 * 1000;

    for (let weekOffset = 16; weekOffset >= 0; weekOffset -= 1) {
      weeklyMap.set(this.weekLabel(now, weekOffset), {});
    }

    for (const visit of visits) {
      const diffWeeks = Math.floor((now.getTime() - visit.visitDate.getTime()) / weekMs);
      if (diffWeeks < 0 || diffWeeks > 16) continue;

      const key = this.weekLabel(now, diffWeeks);
      const bucket = weeklyMap.get(key);
      if (!bucket) continue;

      bucket[visit.conditionSlug] = (bucket[visit.conditionSlug] ?? 0) + 1;
    }

    return Array.from(weeklyMap.entries()).map(([weekLabel, byCondition]) => ({
      weekLabel,
      total: Object.values(byCondition).reduce((sum, count) => sum + count, 0),
      byCondition,
    }));
  }

  private weekLabel(now: Date, weeksAgo: number) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - weeksAgo * 7);
    return `${weekStart.getDate()} ${weekStart.toLocaleString('en-US', { month: 'short' })}`;
  }

  private formatLastVisitSummary(patientName: string | undefined, visitDate: Date, now: Date) {
    const dayDiff = Math.floor((now.getTime() - visitDate.getTime()) / (1000 * 60 * 60 * 24));
    const when =
      dayDiff === 0 ? 'today' : dayDiff === 1 ? 'yesterday' : `${dayDiff} days ago`;

    return patientName
      ? `Your last visit was ${patientName}, ${when}`
      : `Last visit was ${when}`;
  }

  private getConditionLabel(slug: string) {
    const labels: Record<string, string> = {
      fever: 'Fever',
      hypertension: 'Hypertension',
      diabetes: 'Diabetes Checkup',
      general: 'General Checkup',
      asthma: 'Asthma',
      cardiac: 'Cardiac Checkup',
      anemia: 'Anemia',
    };

    return labels[slug] ?? this.toTitleCase(slug);
  }

  private toTitleCase(value: string) {
    return value
      .replace(/[_-]+/g, ' ')
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}
