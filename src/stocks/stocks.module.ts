import { Module } from "@nestjs/common";
import { StocksService } from "./stocks.service";
import { StocksController } from "./stocks.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Stock, StocksModel } from "./data_layer/stocks.model";
import { Medication, MedicationsModel } from "src/medications/data_layer/medications.model";
import { StocksRepository } from "./data_layer/stocks.repository";
import { MedicationsService } from "src/medications/medications.service";
import { MedicationsRepository } from "src/medications/data_layer/medications.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Stock.name, schema: StocksModel }]), MongooseModule.forFeature([{ name: Medication.name, schema: MedicationsModel }])],
  providers: [StocksService, StocksRepository, MedicationsService, MedicationsRepository, { provide: "StocksServiceInterface", useClass: StocksService }],
  controllers: [StocksController],
})
export class StocksModule {}
