import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MedicationPrescribed, OrderStatus } from "../interface/orders.model.interface";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  userId: string;

  @Prop()
  medicationPrescribed: MedicationPrescribed[];

  @Prop()
  medicalPrescription: string;

  @Prop()
  status: OrderStatus;

  @Prop()
  createdAt: Date;

  @Prop()
  totalPrice: number;
}

export const OrdersModel = SchemaFactory.createForClass(Order);
