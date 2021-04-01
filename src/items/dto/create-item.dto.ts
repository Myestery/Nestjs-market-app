import { IsNotEmpty, IsString } from 'class-validator';
export default class CreateItemDto {
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  readonly qty: number;
}
