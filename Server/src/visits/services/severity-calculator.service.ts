import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Severity } from '../../common/enums/severity.enum';
import { VitalNormalRangeEntity, VitalSignRecord } from '../../database/entities';

@Injectable()
export class SeverityCalculatorService {
  constructor(
    @InjectRepository(VitalNormalRangeEntity)
    private readonly vitalRangeRepository: Repository<VitalNormalRangeEntity>,
  ) {}

  async calculate(vitals: VitalSignRecord[]): Promise<Severity> {
    let highest = Severity.Mild;

    for (const vital of vitals) {
      if (typeof vital.value !== 'number') continue;

      const range = await this.vitalRangeRepository.findOne({
        where: { vitalKey: vital.key },
      });

      if (!range) continue;

      const min = Number(range.min);
      const max = Number(range.max);
      const value = Number(vital.value);

      if (value >= min && value <= max) continue;

      const deviation = value < min ? min - value : value - max;
      const span = max - min || 1;
      const ratio = deviation / span;

      if (ratio > 0.25) {
        highest = Severity.Severe;
      } else if (ratio > 0 && highest !== Severity.Severe) {
        highest = Severity.Moderate;
      }
    }

    return highest;
  }
}
