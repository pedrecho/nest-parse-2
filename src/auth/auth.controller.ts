import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @Post('/signup')
    signup(@Body() dto: CreateUserDto) {
        return this.authService.signup(dto);
    }
}
