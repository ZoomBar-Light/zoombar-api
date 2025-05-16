import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { AnnouncementBar } from '../../announcement-bar/entities/announcement-bar.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bar_clicks')
export class BarClick {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => AnnouncementBar })
  @ManyToOne(() => AnnouncementBar, { nullable: false, onDelete: 'CASCADE' })
  bar: AnnouncementBar;

  @ApiProperty({ example: '2024-05-16T12:00:00.000Z' })
  @CreateDateColumn({ name: 'clicked_at' })
  clicked_at: Date;

  @ApiProperty({ example: '192.168.1.1', required: false })
  @Column({ type: 'varchar', length: 64, nullable: true })
  ip_address?: string;

  @ApiProperty({ example: 'Mozilla/5.0', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  user_agent?: string;
} 