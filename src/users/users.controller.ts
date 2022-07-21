import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {User} from "./users.model";
import { Roles } from "../auth/roles-auth.decorator";
import { RolesGuard } from "../auth/roles.guard";


@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    // @Roles('Admin')
    // @UseGuards(RolesGuard)
    @Post()
    create (@Body() userDto: CreateUserDto) {
        console.log(userDto)
        return this.usersService.createUser(userDto);
    }
}
