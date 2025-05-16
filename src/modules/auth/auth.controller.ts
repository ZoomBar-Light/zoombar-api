import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'ثبت‌نام کاربر جدید' })
  @ApiResponse({ status: 201, description: 'کاربر با موفقیت ثبت شد.' })
  @ApiResponse({ status: 409, description: 'ایمیل تکراری.' })
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    const user = await this.authService.signup(dto);
    return { id: user.id, email: user.email, role: user.role, created_at: user.created_at };
  }

  @ApiOperation({ summary: 'ورود کاربر' })
  @ApiResponse({ status: 201, description: 'ورود موفق.', schema: { example: { access_token: '...' } } })
  @ApiResponse({ status: 401, description: 'ایمیل یا رمز عبور اشتباه.' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'دریافت اطلاعات کاربر لاگین‌شده' })
  @ApiResponse({ status: 200, description: 'اطلاعات کاربر.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'دسترسی فقط برای ادمین' })
  @ApiResponse({ status: 200, description: 'شما ادمین هستید.' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get('admin-test')
  async adminTest(@Request() req) {
    return { message: 'You are admin', user: req.user };
  }
} 