import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarClick } from './entities/bar-click.entity';
import { AnnouncementBar } from '../announcement-bar/entities/announcement-bar.entity';
import { BarClickService } from './bar-click.service';
import { BarClickController } from './bar-click.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BarClick, AnnouncementBar])],
  controllers: [BarClickController],
  providers: [BarClickService],
  exports: [TypeOrmModule, BarClickService],
})
export class BarClickModule {} 