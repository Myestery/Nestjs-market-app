import { IsNotEmpty} from 'class-validator';
export default class LoginDto {
  @IsNotEmpty()
  readonly userName: string;
  @IsNotEmpty()
  readonly password: string;
}
