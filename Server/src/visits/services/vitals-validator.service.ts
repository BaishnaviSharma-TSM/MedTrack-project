import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FieldType } from '../../common/enums/field-type.enum';
import {
  ConditionEntity,
  VitalNormalRangeEntity,
  VitalSignRecord,
} from '../../database/entities';
import { VitalSignDto } from '../dto/visit.dto';

@Injectable()
export class VitalsValidatorService {
  constructor(
    @InjectRepository(VitalNormalRangeEntity)
    private readonly vitalRangeRepository: Repository<VitalNormalRangeEntity>,
  ) {}

  async validate(condition: ConditionEntity, vitals: VitalSignDto[]) {
    const errors: { field: string; message: string }[] = [];
    const fields = [...(condition.fields ?? [])].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    for (const field of fields) {
      const vital = vitals.find((item) => item.key === field.key);

      if (field.isRequired && (vital === undefined || this.isEmpty(vital.value))) {
        errors.push({
          field: field.key,
          message: `${field.label} is required.`,
        });
        continue;
      }

      if (!vital) continue;

      if (field.fieldType === FieldType.Boolean && typeof vital.value !== 'boolean') {
        errors.push({
          field: field.key,
          message: `${field.label} must be Yes or No.`,
        });
      }

      if (field.fieldType === FieldType.Number) {
        const numeric = Number(vital.value);

        if (Number.isNaN(numeric)) {
          errors.push({
            field: field.key,
            message: `${field.label} must be a valid number.`,
          });
          continue;
        }

        const range = await this.vitalRangeRepository.findOne({
          where: { vitalKey: field.key },
        });

        if (range && (numeric < Number(range.min) || numeric > Number(range.max))) {
          errors.push({
            field: field.key,
            message: `${field.label} is out of acceptable range.`,
          });
        }
      }
    }

    const allowedKeys = new Set(fields.map((field) => field.key));
    for (const vital of vitals) {
      if (!allowedKeys.has(vital.key)) {
        errors.push({
          field: vital.key,
          message: `Unknown vital field: ${vital.key}`,
        });
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Vitals validation failed',
        errors,
      });
    }

    return vitals.map((vital) => ({
      key: vital.key,
      label: vital.label,
      value: vital.value,
      unit: vital.unit,
    })) as VitalSignRecord[];
  }

  private isEmpty(value: string | number | boolean | undefined) {
    return value === undefined || value === null || String(value).trim() === '';
  }
}
