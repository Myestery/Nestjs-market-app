import { IsNotEmpty } from 'class-validator';
export default class JwtPayload {
  readonly username: string;
  @IsNotEmpty()
  readonly id: string;
  @IsNotEmpty()
  readonly meta: {
    [key: string]: any;
  };
}
