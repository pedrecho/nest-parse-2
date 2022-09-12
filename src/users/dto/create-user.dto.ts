import { IsEmail, IsEnum, IsIn, Min } from 'class-validator';
import { userRoles } from '../users.model';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;
  @Min(4)
  readonly password: string;
  @IsIn(userRoles)
  readonly role: string;
}
