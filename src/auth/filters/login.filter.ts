import { Response } from 'express';

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(BadRequestException)
export class LoginFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response
      .status(HttpStatus.UNAUTHORIZED)
      .json(HttpException.createBody(new UnauthorizedException())['response']);
  }
}
