import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StockDocument = HydratedDocument<Stock>;

@Schema()
export class Stock {
  @Prop()
  medicationId: string;

  @Prop()
  medicationQuantity: number;

  @Prop()
  expirationDate: Date;
}

export const StocksModel = SchemaFactory.createForClass(Stock);
