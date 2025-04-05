import { IsString } from 'class-validator';

import { IsNotEmpty } from 'class-validator';

export class GetUserDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
