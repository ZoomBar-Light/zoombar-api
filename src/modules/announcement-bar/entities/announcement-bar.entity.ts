import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export type TimerStyle = 'square' | 'circle' | 'none';
export type TimerPosition = 'left' | 'right';
export type LinkTarget = '_self' | '_blank';

@Entity('announcement_bars')
export class AnnouncementBar {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => User })
  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  user: User;

  @ApiProperty({ example: 'Title' })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'Message text' })
  @Column({ type: 'text' })
  message: string;

  @ApiProperty({ example: '#ffffff' })
  @Column({ type: 'varchar', length: 32 })
  background_color: string;

  @ApiProperty({ example: '#000000' })
  @Column({ type: 'varchar', length: 32 })
  text_color: string;

  @ApiProperty({ example: 'https://example.com/image.png', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  image_url?: string;

  @ApiProperty({ example: '2024-05-16T12:00:00.000Z', required: false })
  @Column({ type: 'timestamp', nullable: true })
  expires_at?: Date;

  @ApiProperty({ example: '#cccccc' })
  @Column({ type: 'varchar', length: 32 })
  timer_background_color: string;

  @ApiProperty({ example: '#333333' })
  @Column({ type: 'varchar', length: 32 })
  timer_text_color: string;

  @ApiProperty({ example: 'circle', enum: ['square', 'circle', 'none'] })
  @Column({ type: 'enum', enum: ['square', 'circle', 'none'], default: 'none' })
  timer_style: TimerStyle;

  @ApiProperty({ example: 'left', enum: ['left', 'right'] })
  @Column({ type: 'enum', enum: ['left', 'right'], default: 'left' })
  timer_position: TimerPosition;

  @ApiProperty({ example: '16px' })
  @Column({ type: 'varchar', length: 16 })
  font_size: string;

  @ApiProperty({ example: 'Click here', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  cta_text?: string;

  @ApiProperty({ example: 'https://example.com', required: false })
  @Column({ type: 'varchar', length: 255, nullable: true })
  cta_link?: string;

  @ApiProperty({ example: '#ff0000', required: false })
  @Column({ type: 'varchar', length: 32, nullable: true })
  cta_background_color?: string;

  @ApiProperty({ example: '#ffffff', required: false })
  @Column({ type: 'varchar', length: 32, nullable: true })
  cta_text_color?: string;

  @ApiProperty({ example: '_blank', enum: ['_self', '_blank'] })
  @Column({ type: 'enum', enum: ['_self', '_blank'], default: '_self' })
  cta_link_target: LinkTarget;

  @ApiProperty({ example: '2024-05-16T12:00:00.000Z' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ example: '2024-05-16T12:00:00.000Z' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
} 