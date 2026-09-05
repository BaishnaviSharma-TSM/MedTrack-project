jest.mock('@nestjs/typeorm', () => ({
  InjectRepository: () => () => undefined,
}));

import { Severity } from '../../common/enums/severity.enum';
import { SeverityCalculatorService } from './severity-calculator.service';

describe('SeverityCalculatorService', () => {
  let service: SeverityCalculatorService;

  const mockRepository = {
    findOne: jest.fn(),
  };

  beforeEach(() => {
    service = new SeverityCalculatorService(mockRepository as never);
    mockRepository.findOne.mockReset();
  });

  it('returns mild when all numeric vitals are within range', async () => {
    mockRepository.findOne.mockResolvedValue({ min: 60, max: 100 });

    const severity = await service.calculate([
      { key: 'pulse', label: 'Pulse', value: 72, unit: 'bpm' },
    ]);

    expect(severity).toBe(Severity.Mild);
  });

  it('returns moderate for a small deviation from normal range', async () => {
    mockRepository.findOne.mockResolvedValue({ min: 90, max: 120 });

    const severity = await service.calculate([
      { key: 'systolic', label: 'Systolic BP', value: 125, unit: 'mmHg' },
    ]);

    expect(severity).toBe(Severity.Moderate);
  });

  it('returns severe for a large deviation from normal range', async () => {
    mockRepository.findOne.mockResolvedValue({ min: 90, max: 120 });

    const severity = await service.calculate([
      { key: 'systolic', label: 'Systolic BP', value: 180, unit: 'mmHg' },
    ]);

    expect(severity).toBe(Severity.Severe);
  });
});
