import { Injectable } from "@nestjs/common";
import { MedicationsRepository } from "src/medications/data_layer/medications.repository";
import { OrdersRepository } from "./data_layer/orders.repository";

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository, private readonly medicationRepository: MedicationsRepository) {}
}
