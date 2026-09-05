import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConditionEntity } from '../database/entities';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectRepository(ConditionEntity)
    private readonly conditionRepository: Repository<ConditionEntity>,
  ) {}

  async findAll() {
    const conditions = await this.conditionRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC' },
    });

    return {
      message: 'Conditions retrieved successfully',
      data: conditions.map((condition) => this.toDto(condition)),
    };
  }

  async findBySlug(slug: string) {
    const condition = await this.conditionRepository.findOne({
      where: { slug, isActive: true },
    });

    if (!condition) {
      throw new NotFoundException('Condition not found');
    }

    return {
      message: 'Condition retrieved successfully',
      data: this.toDto(condition),
    };
  }

  private toDto(condition: ConditionEntity) {
    const fields = [...(condition.fields ?? [])].sort(
      (a, b) => a.sortOrder - b.sortOrder,
    );

    return {
      slug: condition.slug,
      label: condition.label,
      fields: fields.map((field) => ({
        key: field.key,
        label: field.label,
        type: field.fieldType,
        unit: field.unit,
        placeholder: field.placeholder,
        required: field.isRequired,
      })),
    };
  }
}
