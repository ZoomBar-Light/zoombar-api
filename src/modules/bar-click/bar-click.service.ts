import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BarClick } from './entities/bar-click.entity';
import { AnnouncementBar } from '../announcement-bar/entities/announcement-bar.entity';

@Injectable()
export class BarClickService {
  constructor(
    @InjectRepository(BarClick)
    private readonly clickRepository: Repository<BarClick>,
    @InjectRepository(AnnouncementBar)
    private readonly barRepository: Repository<AnnouncementBar>,
  ) {}

  async create(barId: string, ip_address?: string, user_agent?: string): Promise<BarClick> {
    const bar = await this.barRepository.findOne({ where: { id: barId } });
    if (!bar) throw new NotFoundException('Bar not found');
    const click = this.clickRepository.create({ bar, ip_address, user_agent });
    return this.clickRepository.save(click);
  }

  async countByBar(barId: string): Promise<number> {
    return this.clickRepository.count({ where: { bar: { id: barId } } });
  }
} 