import { Controller, Post, Param, Body, Get, Query, Req } from '@nestjs/common';
import { BarClickService } from './bar-click.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Public - Bar Clicks')
@Controller('public/bars')
export class BarClickController {
  constructor(private readonly barClickService: BarClickService) {}

  @ApiOperation({ summary: 'ثبت کلیک روی نوار اعلان' })
  @ApiResponse({ status: 201, description: 'کلیک ثبت شد.' })
  @Post(':barId/click')
  async create(
    @Param('barId') barId: string,
    @Req() req,
  ) {
    const ip_address = req.ip;
    const user_agent = req.headers['user-agent'];
    await this.barClickService.create(barId, ip_address, user_agent);
    return { success: true };
  }

  @ApiOperation({ summary: 'دریافت تعداد کلیک‌های یک نوار اعلان' })
  @ApiResponse({ status: 200, description: 'تعداد کلیک‌ها.' })
  @Get(':barId/clicks/count')
  async count(@Param('barId') barId: string) {
    const count = await this.barClickService.countByBar(barId);
    return { barId, count };
  }
} 