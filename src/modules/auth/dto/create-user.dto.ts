import { IsNotEmpty, IsString } from 'class-validator';
export default class CreateUserDto {
  @IsNotEmpty()
  readonly firstName: string;
  @IsNotEmpty()
  readonly userName: string;
  @IsString()
  readonly lastName: string;
  @IsString()
  readonly password: string;
}
