import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { Order, OrderDocument } from "./orders.model";

@Injectable()
export class OrdersRepository {
  constructor(@InjectModel(Order.name) private ordersModel: Model<OrderDocument>) {}

  async create(order: Order): Promise<Order> {
    const newOrder = new this.ordersModel(order);
    return newOrder.save();
  }

  async find(orderFilterQuaery: FilterQuery<Order>): Promise<Order[]> {
    return this.ordersModel.find(orderFilterQuaery);
  }

  async findById(orderId: string): Promise<Order | null> {
    return this.ordersModel.findById({ _id: orderId });
  }

  async findByIdAndUpdate(orderId: ObjectId, order: Partial<Order>): Promise<Order | null> {
    return this.ordersModel.findByIdAndUpdate({ _id: orderId }, order, { new: true });
  }

  async findByIdAndDelete(orderId: ObjectId): Promise<Order | null> {
    return this.ordersModel.findByIdAndDelete({ _id: orderId });
  }
}
