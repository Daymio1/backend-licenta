import { IsNotEmpty, IsBoolean, IsNumber, IsString } from "class-validator";

export class MedicationDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  manufacturer: string;

  @IsNotEmpty()
  @IsString()
  dosageForm: string;

  @IsNotEmpty()
  @IsString()
  concentraction: string;

  @IsNotEmpty()
  @IsBoolean()
  requirePrescription: boolean;

  @IsNotEmpty()
  @IsString()
  lot: string;
}
