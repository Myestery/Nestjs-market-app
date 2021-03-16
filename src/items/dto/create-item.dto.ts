import { IsNotEmpty, IsString } from 'class-validator';
export default class CreateItemDto {
  @IsNotEmpty()
  readonly name: string;
  // @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  readonly qty: number;
}
