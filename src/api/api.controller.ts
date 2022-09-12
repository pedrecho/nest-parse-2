import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiService } from './api.service';
import { Roles } from '../auth/guards/roles-auth.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/startParse')
  startParse() {
    return this.apiService.startParse();
  }

  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @Post('/stopParse')
  stopParse() {
    return this.apiService.stopParse();
  }
}
