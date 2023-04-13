import { IsNotEmpty, IsNumber, IsString, IsDateString } from "class-validator";

export class StockDto {
  @IsNotEmpty()
  @IsString()
  medicationId: string;

  @IsNotEmpty()
  @IsNumber()
  medicationQuantity: number;

  @IsNotEmpty()
  @IsDateString()
  expirationDate: Date;
}
