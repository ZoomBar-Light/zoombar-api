import { IsString, IsOptional, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TimerStyle, TimerPosition, LinkTarget } from '../entities/announcement-bar.entity';

export class CreateAnnouncementBarDto {
  @ApiProperty({ example: 'عنوان نوار' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'متن پیام' })
  @IsString()
  message: string;

  @ApiProperty({ example: '#ffffff' })
  @IsString()
  background_color: string;

  @ApiProperty({ example: '#000000' })
  @IsString()
  text_color: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  image_url?: string;

  @ApiPropertyOptional({ example: '2024-12-31T23:59:59.000Z' })
  @IsOptional()
  @IsDateString()
  expires_at?: string;

  @ApiProperty({ example: '#cccccc' })
  @IsString()
  timer_background_color: string;

  @ApiProperty({ example: '#333333' })
  @IsString()
  timer_text_color: string;

  @ApiProperty({ example: 'circle', enum: ['square', 'circle', 'none'] })
  @IsEnum(['square', 'circle', 'none'])
  timer_style: TimerStyle;

  @ApiProperty({ example: 'left', enum: ['left', 'right'] })
  @IsEnum(['left', 'right'])
  timer_position: TimerPosition;

  @ApiProperty({ example: '16px' })
  @IsString()
  font_size: string;

  @ApiPropertyOptional({ example: 'کلیک کن', description: 'متن دکمه CTA' })
  @IsOptional()
  @IsString()
  cta_text?: string;

  @ApiPropertyOptional({ example: 'https://example.com', description: 'لینک CTA' })
  @IsOptional()
  @IsString()
  cta_link?: string;

  @ApiPropertyOptional({ example: '#ff0000', description: 'رنگ پس‌زمینه CTA' })
  @IsOptional()
  @IsString()
  cta_background_color?: string;

  @ApiPropertyOptional({ example: '#ffffff', description: 'رنگ متن CTA' })
  @IsOptional()
  @IsString()
  cta_text_color?: string;

  @ApiProperty({ example: '_blank', enum: ['_self', '_blank'] })
  @IsEnum(['_self', '_blank'])
  cta_link_target: LinkTarget;
} 