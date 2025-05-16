import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnnouncementBar } from './entities/announcement-bar.entity';
import { User } from '../user/entities/user.entity';
import { CreateAnnouncementBarDto } from './dto/create-announcement-bar.dto';

@Injectable()
export class AnnouncementBarService {
  constructor(
    @InjectRepository(AnnouncementBar)
    private readonly barRepository: Repository<AnnouncementBar>,
  ) {}

  async create(data: CreateAnnouncementBarDto, user: User): Promise<AnnouncementBar> {
    const expires_at = data.expires_at ? new Date(data.expires_at as any) : undefined;
    const bar = this.barRepository.create({ ...data, expires_at, user });
    return this.barRepository.save(bar);
  }

  async findAllByUser(user: User): Promise<AnnouncementBar[]> {
    return this.barRepository.find({ where: { user: { id: user.id } }, relations: ['user'] });
  }

  async findOneByUser(barId: string, user: User): Promise<AnnouncementBar> {
    const bar = await this.barRepository.findOne({ where: { id: barId }, relations: ['user'] });
    if (!bar) throw new NotFoundException('Bar not found');
    if (bar.user.id !== user.id && user.role !== 'admin') throw new ForbiddenException('Access denied');
    return bar;
  }

  async update(barId: string, data: Partial<AnnouncementBar>, user: User): Promise<AnnouncementBar> {
    const bar = await this.findOneByUser(barId, user);
    Object.assign(bar, data);
    return this.barRepository.save(bar);
  }

  async remove(barId: string, user: User): Promise<void> {
    const bar = await this.findOneByUser(barId, user);
    await this.barRepository.remove(bar);
  }

  // Admin methods
  async findAll(): Promise<AnnouncementBar[]> {
    return this.barRepository.find({ relations: ['user'] });
  }

  async findOne(barId: string): Promise<AnnouncementBar> {
    const bar = await this.barRepository.findOne({ where: { id: barId }, relations: ['user'] });
    if (!bar) throw new NotFoundException('Bar not found');
    return bar;
  }
} 