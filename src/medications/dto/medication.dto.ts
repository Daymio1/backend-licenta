import { IsNotEmpty, IsBoolean, IsNumber, IsString, IsEnum } from "class-validator";
import { MedicationType } from "../interfaces/medications.model.interface";

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
  @IsEnum(MedicationType, { message: "Type unknown." })
  type: MedicationType = MedicationType.OTC;

  @IsNotEmpty()
  @IsString()
  concentraction: string;

  @IsNotEmpty()
  @IsString()
  lot: string;

  @IsNotEmpty()
  @IsString()
  CIM: string;
}
