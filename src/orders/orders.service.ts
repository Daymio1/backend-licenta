import { Injectable } from "@nestjs/common";
import { FilterQuery, ObjectId } from "mongoose";
import { MedicationsRepository } from "src/medications/data_layer/medications.repository";
import { Order } from "./data_layer/orders.model";
import { OrdersRepository } from "./data_layer/orders.repository";
import { OrderDto } from "./dto/order.dto";
import { OrdersServiceInterface } from "./interface/orders.service.interface";

@Injectable()
export class OrdersService implements OrdersServiceInterface {
  constructor(private readonly ordersRepository: OrdersRepository, private readonly medicationRepository: MedicationsRepository) {}

  async createOrder(orderDto: OrderDto): Promise<Order> {
    orderDto.medicationPrescribed.forEach(async medicationPrescribed => {
      const medication = await this.medicationRepository.findById(medicationPrescribed.medicationId);
      if (!medication) {
        throw new Error("Medication not available in data base.");
      }
    });
    return this.ordersRepository.create(orderDto);
  }

  async getAllOrders(orderFilterQuery: FilterQuery<OrderDto>): Promise<Order[]> {
    return this.ordersRepository.find(orderFilterQuery);
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    return this.ordersRepository.findById(orderId);
  }

  async updateOrderById(orderId: ObjectId, order: Partial<Order>): Promise<Order | null> {
    return this.ordersRepository.findByIdAndUpdate(orderId, order);
  }

  async deleteOrderById(orderId: ObjectId): Promise<Order | null> {
    return this.ordersRepository.findByIdAndDelete(orderId);
  }
}
