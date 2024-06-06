import { IsUrl, Length } from 'class-validator';

export class CreateWishlistDto {
  @Length(1, 250)
  name: string; // название подарка
  @Length(1, 1500)
  description: string; // описание подборки
  @IsUrl()
  image: string; // обложка для подборки
}
