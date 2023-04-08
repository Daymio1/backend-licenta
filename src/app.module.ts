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
dotenv.config();

@Module({
  imports: [
    MedicationsModule,
    MongooseModule.forRoot("mongodb+srv://AlexandruM:bomboane@cluster0.qqvqb.mongodb.net/test"),
    MongooseModule.forFeature([{ name: Medication.name, schema: MedicationsModel }]),
    AuthorizationModule,
  ],
  controllers: [AppController, MedicationsController],
  providers: [
    AppService,
    MedicationsService,
    MedicationsRepository,
    {
      provide: "MedicationsServiceInterface",
      useClass: MedicationsService,
    },
  ],
})
export class AppModule {}
