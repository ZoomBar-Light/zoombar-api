import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export type UserRole = 'admin' | 'user';

@Entity('users')
@Unique(['email'])
export class User {
  @ApiProperty({ example: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'user@example.com' })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({ example: 'hashed_password', description: 'Hashed password', writeOnly: true })
  @Column({ type: 'varchar', length: 255 })
  password_hash: string;

  @ApiProperty({ example: 'user', enum: ['admin', 'user'] })
  @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
  role: UserRole;

  @ApiProperty({ example: '2024-05-16T12:00:00.000Z' })
  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @ApiProperty({ example: '2024-05-16T12:00:00.000Z' })
  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
} 