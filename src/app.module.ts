import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import * as dotenv from "dotenv";
import { Medication, MedicationsModel } from "./medications/data_layer/medications.model";
import { MedicationsController } from "./medications/medications.controler";
import { MedicationsService } from "./medications/medications.service";
import { MedicationsRepository } from "./medications/data_layer/medications.repository";
import { MedicationsModule } from "./medications/medications.module";
import { AuthorizationModule } from "./authorization/authorization.module";
import { StocksService } from "./stocks/stocks.service";
import { StocksModule } from "./stocks/stocks.module";
import { Stock, StocksModel } from "./stocks/data_layer/stocks.model";
import { StocksController } from "./stocks/stocks.controller";
import { StocksRepository } from "./stocks/data_layer/stocks.repository";
dotenv.config();

@Module({
  imports: [
    MedicationsModule,
    StocksModule,
    MongooseModule.forRoot("mongodb+srv://AlexandruM:bomboane@cluster0.qqvqb.mongodb.net/test"),
    MongooseModule.forFeature([{ name: Medication.name, schema: MedicationsModel }]),
    MongooseModule.forFeature([{ name: Stock.name, schema: StocksModel }]),
    AuthorizationModule,
  ],
  controllers: [AppController, MedicationsController, StocksController],
  providers: [
    AppService,
    MedicationsService,
    MedicationsRepository,
    {
      provide: "MedicationsServiceInterface",
      useClass: MedicationsService,
    },
    StocksService,
    StocksRepository,
    {
      provide: "StocksServiceInterface",
      useClass: StocksService,
    },
  ],
})
export class AppModule {}
