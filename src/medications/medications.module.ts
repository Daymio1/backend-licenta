import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Medication, MedicationsModel } from "./data_layer/medications.model";
import { MedicationsRepository } from "./data_layer/medications.repository";
import { MedicationsController } from "./medications.controler";
import { MedicationsService } from "./medications.service";

@Module({
  imports: [MongooseModule.forFeature([{ name: Medication.name, schema: MedicationsModel }])],
  providers: [
    MedicationsService,
    MedicationsRepository,
    {
      provide: "MedicationsServiceInterface",
      useClass: MedicationsService,
    },
  ],
  controllers: [MedicationsController],
})
export class MedicationsModule {}
