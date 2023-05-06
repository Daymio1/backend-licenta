import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { MedicationPrescribed, OrderStatus } from "../interface/orders.model.interface";

export class OrderDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  medicationPrescribed: MedicationPrescribed[];

  @IsString()
  medicalPrescription: string;

  @IsNotEmpty()
  @IsEnum(OrderStatus, { message: "Status unknown." })
  status: OrderStatus = OrderStatus.PENDING;

  @IsNotEmpty()
  @IsDate()
  createdAt: Date = new Date();

  @IsNotEmpty()
  @IsNumber()
  totalPrice: number;
}
