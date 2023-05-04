import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { MedicationPrescribed, OrderStatus } from "../interface/orders.model.interface";

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  medicationPrescribed: MedicationPrescribed[];

  @IsNotEmpty()
  @IsString()
  medicalPrescription: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus, { message: "Status unknown." })
  status: OrderStatus = OrderStatus.PENDING;

  @IsNotEmpty()
  @IsDateString()
  createdAt: Date = new Date();
}
