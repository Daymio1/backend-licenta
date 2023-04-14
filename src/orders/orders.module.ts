import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { Medication, MedicationsModel } from "src/medications/data_layer/medications.model";
import { MongooseModule } from "@nestjs/mongoose";
import { Order, OrdersModel } from "./data_layer/orders.model";
import { OrdersRepository } from "./data_layer/orders.repository";
import { MedicationsService } from "src/medications/medications.service";
import { MedicationsRepository } from "src/medications/data_layer/medications.repository";

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrdersModel }]), MongooseModule.forFeature([{ name: Medication.name, schema: MedicationsModel }])],
  providers: [OrdersService, OrdersRepository, MedicationsService, MedicationsRepository, { provide: "OrdersServiceInterface", useClass: OrdersService }],
  controllers: [OrdersController],
})
export class OrdersModule {}
