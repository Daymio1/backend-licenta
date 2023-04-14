import { FilterQuery, ObjectId } from "mongoose";
import { Order } from "../data_layer/orders.model";
import { OrderDto } from "../dto/order.dto";

export interface OrdersServiceInterface {
  createOrder(orderDto: OrderDto): Promise<Order>;
  getAllOrders(orderFilterQuery: FilterQuery<OrderDto>): Promise<Order[]>;
  getOrderById(orderId: string): Promise<Order | null>;
  updateOrderById(orderId: ObjectId, order: Partial<Order>): Promise<Order | null>;
  deleteOrderById(orderId: ObjectId): Promise<Order | null>;
}
