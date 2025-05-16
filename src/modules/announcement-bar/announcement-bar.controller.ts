import { Controller, Post, Get, Param, Patch, Delete, Body, Request, UseGuards, Query } from '@nestjs/common';
import { AnnouncementBarService } from './announcement-bar.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Announcement Bars')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('announcement-bars')
export class AnnouncementBarController {
  constructor(private readonly barService: AnnouncementBarService) {}

  @ApiOperation({ summary: 'ایجاد نوار اعلان جدید' })
  @ApiResponse({ status: 201, description: 'نوار اعلان ایجاد شد.' })
  @Post()
  async create(@Body() data: any, @Request() req) {
    return this.barService.create(data, req.user);
  }

  @ApiOperation({ summary: 'دریافت لیست نوارهای اعلان کاربر فعلی' })
  @ApiResponse({ status: 200, description: 'لیست نوارهای اعلان.' })
  @Get()
  async findAll(@Request() req) {
    return this.barService.findAllByUser(req.user);
  }

  @ApiOperation({ summary: 'دریافت جزئیات یک نوار اعلان' })
  @ApiResponse({ status: 200, description: 'جزئیات نوار اعلان.' })
  @Get(':barId')
  async findOne(@Param('barId') barId: string, @Request() req) {
    return this.barService.findOneByUser(barId, req.user);
  }

  @ApiOperation({ summary: 'ویرایش یک نوار اعلان' })
  @ApiResponse({ status: 200, description: 'نوار اعلان ویرایش شد.' })
  @Patch(':barId')
  async update(@Param('barId') barId: string, @Body() data: any, @Request() req) {
    return this.barService.update(barId, data, req.user);
  }

  @ApiOperation({ summary: 'حذف یک نوار اعلان' })
  @ApiResponse({ status: 200, description: 'نوار اعلان حذف شد.' })
  @Delete(':barId')
  async remove(@Param('barId') barId: string, @Request() req) {
    await this.barService.remove(barId, req.user);
    return { success: true };
  }
}

@ApiTags('Admin - Announcement Bars')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('admin/announcement-bars')
export class AdminAnnouncementBarController {
  constructor(private readonly barService: AnnouncementBarService) {}

  @ApiOperation({ summary: 'لیست همه نوارهای اعلان (ادمین)' })
  @ApiResponse({ status: 200, description: 'لیست همه نوارهای اعلان.' })
  @Get()
  async findAll() {
    return this.barService.findAll();
  }

  @ApiOperation({ summary: 'جزئیات یک نوار اعلان (ادمین)' })
  @ApiResponse({ status: 200, description: 'جزئیات نوار اعلان.' })
  @Get(':barId')
  async findOne(@Param('barId') barId: string) {
    return this.barService.findOne(barId);
  }
}

@ApiTags('Public - Announcement Bars')
@Controller('public/bars')
export class PublicAnnouncementBarController {
  constructor(private readonly barService: AnnouncementBarService) {}

  @ApiOperation({ summary: 'دریافت داده‌های نوار اعلان برای نمایش عمومی' })
  @ApiResponse({ status: 200, description: 'داده‌های نوار اعلان.' })
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