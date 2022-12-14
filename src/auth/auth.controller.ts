import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginFilter } from './filters/login.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @UseFilters(LoginFilter)
  login(@Body() dto: CreateUserDto) {
    return this.authService.login(dto);
  }

  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }
}
