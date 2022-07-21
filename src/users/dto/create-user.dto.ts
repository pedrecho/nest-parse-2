import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly role: string;
}