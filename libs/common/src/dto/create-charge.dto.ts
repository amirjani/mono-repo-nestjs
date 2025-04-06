import { IsNotEmpty, IsNotEmptyObject, IsNumber } from 'class-validator';
import { ValidateNested } from 'class-validator';
import { CardDto } from './card.dto';
import { Type } from 'class-transformer';

export class CreateChargeDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CardDto)
  card: CardDto;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
