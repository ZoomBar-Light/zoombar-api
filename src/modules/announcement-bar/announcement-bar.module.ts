import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnnouncementBar } from './entities/announcement-bar.entity';
import { AnnouncementBarService } from './announcement-bar.service';
import { AnnouncementBarController, AdminAnnouncementBarController, PublicAnnouncementBarController } from './announcement-bar.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnnouncementBar])],
  controllers: [AnnouncementBarController, AdminAnnouncementBarController, PublicAnnouncementBarController],
  providers: [AnnouncementBarService],
  exports: [TypeOrmModule, AnnouncementBarService],
})
export class AnnouncementBarModule {} 