import { registerAs } from '@nestjs/config';

export type JwtSecretConfig = {
  secret: string;
  expirationTime: string;
};

export default registerAs(
  'jwtSecretConfig',
  (): JwtSecretConfig => ({
    secret: process.env['JWT_TOKEN'],
    expirationTime: process.env['JWT_EXPIRATION_TIME'],
  }),
);