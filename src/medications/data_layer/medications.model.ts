import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { MedicationType } from "../interfaces/medications.model.interface";

export type MedicationDocument = HydratedDocument<Medication>;

@Schema()
export class Medication {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  manufacturer: string;

  @Prop()
  type: MedicationType;

  @Prop()
  concentration: string;

  @Prop()
  lot: string;

  @Prop()
  CIM: string;
}

export const MedicationsModel = SchemaFactory.createForClass(Medication);
