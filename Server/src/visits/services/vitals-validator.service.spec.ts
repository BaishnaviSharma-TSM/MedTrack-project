jest.mock('@nestjs/typeorm', () => ({
  InjectRepository: () => () => undefined,
}));

import { BadRequestException } from '@nestjs/common';
import { FieldType } from '../../common/enums/field-type.enum';
import {
  ConditionEntity,
  ConditionFieldEntity,
} from '../../database/entities';
import { VitalsValidatorService } from './vitals-validator.service';

describe('VitalsValidatorService', () => {
  let service: VitalsValidatorService;

  const mockRepository = {
    findOne: jest.fn(),
  };

  const feverCondition = {
    id: 'cond-1',
    slug: 'fever',
    label: 'Fever',
    fields: [
      {
        key: 'temperature',
        label: 'Temperature',
        fieldType: FieldType.Number,
        isRequired: true,
        sortOrder: 0,
      },
    ] as ConditionFieldEntity[],
  } as ConditionEntity;

  beforeEach(() => {
    service = new VitalsValidatorService(mockRepository as never);
    mockRepository.findOne.mockReset();
    mockRepository.findOne.mockResolvedValue({ min: 97, max: 99 });
  });

  it('accepts valid vitals for a condition', async () => {
    const result = await service.validate(feverCondition, [
      { key: 'temperature', label: 'Temperature', value: 98.6, unit: '°F' },
    ]);

    expect(result).toHaveLength(1);
    expect(result[0].value).toBe(98.6);
  });

  it('rejects missing required vitals', async () => {
    await expect(service.validate(feverCondition, [])).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('rejects unknown vital keys', async () => {
    await expect(
      service.validate(feverCondition, [
        { key: 'unknown', label: 'Unknown', value: 1 },
      ]),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
