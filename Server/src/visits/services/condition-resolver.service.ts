import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConditionEntity } from '../../database/entities';

@Injectable()
export class ConditionResolverService {
  constructor(
    @InjectRepository(ConditionEntity)
    private readonly conditionRepository: Repository<ConditionEntity>,
  ) {}

  async resolve(slug: string) {
    const condition = await this.conditionRepository.findOne({
      where: { slug, isActive: true },
    });

    if (!condition) {
      throw new NotFoundException('Condition not found');
    }

    return condition;
  }
}
