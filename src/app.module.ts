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
import { OrdersModule } from "./orders/orders.module";
import { Order, OrdersModel } from "./orders/data_layer/orders.model";
import { OrdersController } from "./orders/orders.controller";
import { OrdersService } from "./orders/orders.service";
import { OrdersRepository } from "./orders/data_layer/orders.repository";
dotenv.config();

@Module({
  imports: [
    MedicationsModule,
    StocksModule,
    OrdersModule,
    MongooseModule.forRoot("mongodb+srv://AlexandruM:bomboane@cluster0.qqvqb.mongodb.net/test"),
    MongooseModule.forFeature([{ name: Medication.name, schema: MedicationsModel }]),
    MongooseModule.forFeature([{ name: Stock.name, schema: StocksModel }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrdersModel }]),
    AuthorizationModule,
  ],
  controllers: [AppController, MedicationsController, StocksController, OrdersController],
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
    OrdersService,
    OrdersRepository,
    {
      provide: "OrdersServiceInterface",
      useClass: OrdersService,
    },
  ],
})
export class AppModule {}
