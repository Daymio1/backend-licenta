import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

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
  dosageForm: string;

  @Prop()
  concentraction: string;

  @Prop()
  requirePrescription: boolean;

  @Prop()
  lot: string;
}

export const MedicationsModel = SchemaFactory.createForClass(Medication);
