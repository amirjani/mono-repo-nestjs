import { IsCreditCard, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CardDto {
  @IsNotEmpty()
  @IsString()
  cvc: string;

  @IsNotEmpty()
  @IsNumber()
  exp_month: number;

  @IsNotEmpty()
  @IsNumber()
  exp_year: number;

  @IsNotEmpty()
  @IsCreditCard()
  number: string;
}
