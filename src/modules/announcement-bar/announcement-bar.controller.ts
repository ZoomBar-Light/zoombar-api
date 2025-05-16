import { Controller, Post, Get, Param, Patch, Delete, Body, Request, UseGuards, Query } from '@nestjs/common';
import { AnnouncementBarService } from './announcement-bar.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('announcement-bars')
export class AnnouncementBarController {
  constructor(private readonly barService: AnnouncementBarService) {}

  @Post()
  async create(@Body() data: any, @Request() req) {
    return this.barService.create(data, req.user);
  }

  @Get()
  async findAll(@Request() req) {
    return this.barService.findAllByUser(req.user);
  }

  @Get(':barId')
  async findOne(@Param('barId') barId: string, @Request() req) {
    return this.barService.findOneByUser(barId, req.user);
  }

  @Patch(':barId')
  async update(@Param('barId') barId: string, @Body() data: any, @Request() req) {
    return this.barService.update(barId, data, req.user);
  }

  @Delete(':barId')
  async remove(@Param('barId') barId: string, @Request() req) {
    await this.barService.remove(barId, req.user);
    return { success: true };
  }
}

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('admin/announcement-bars')
export class AdminAnnouncementBarController {
  constructor(private readonly barService: AnnouncementBarService) {}

  @Get()
  async findAll() {
    return this.barService.findAll();
  }

  @Get(':barId')
  async findOne(@Param('barId') barId: string) {
    return this.barService.findOne(barId);
  }
}

@Controller('public/bars')
export class PublicAnnouncementBarController {
  constructor(private readonly barService: AnnouncementBarService) {}

  @Get(':barId')
  async getPublicBar(
    @Param('barId') barId: string,
    @Query('userId') userId?: string,
  ) {
    const bar = await this.barService.findOne(barId);
    if (userId && bar.user.id !== userId) {
      return { error: 'Not found' };
    }
    // فقط داده‌های مورد نیاز برای نمایش عمومی را برگردان
    const { id, title, message, background_color, text_color, image_url, expires_at, timer_background_color, timer_text_color, timer_style, timer_position, font_size, cta_text, cta_link, cta_background_color, cta_text_color, cta_link_target } = bar;
    return { id, title, message, background_color, text_color, image_url, expires_at, timer_background_color, timer_text_color, timer_style, timer_position, font_size, cta_text, cta_link, cta_background_color, cta_text_color, cta_link_target };
  }
} 