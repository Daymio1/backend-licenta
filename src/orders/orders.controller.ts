import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { OrdersService } from "./orders.service";
import { OrderDto } from "./dto/order.dto";
import { FilterQuery, ObjectId } from "mongoose";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
  constructor(@Inject("OrdersServiceInterface") private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("/create")
  async createOrder(@Res() res: Response, @Body() orderDto: OrderDto) {
    const order = await this.ordersService.createOrder(orderDto);
    return res.status(HttpStatus.CREATED).json({ message: "Order successfully added", order });
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/all")
  async getAllOrders(@Res() res: Response, @Body() ordersFilterQuery: FilterQuery<OrderDto>) {
    const orders = await this.ordersService.getAllOrders(ordersFilterQuery);
    if (!orders) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No orders found" });
    }
    return res.status(HttpStatus.OK).json(orders);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/:orderId")
  async getOrderById(@Res() res: Response, @Param("orderId") orderId: string) {
    const order = await this.ordersService.getOrderById(orderId);
    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No order found" });
    }
    return res.status(HttpStatus.OK).json(order);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/edit/:orderId")
  async updateOrderById(@Res() res: Response, @Param("orderId") orderId: ObjectId, @Body() orderDto: Partial<OrderDto>) {
    const order = await this.ordersService.updateOrderById(orderId, orderDto);
    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No order found" });
    }
    return res.status(HttpStatus.OK).json({
      message: "Order successfully updated",
      order,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/delete/:orderId")
  async deleteOrderById(@Res() res: Response, @Param("orderId") orderId: ObjectId) {
    const order = await this.ordersService.deleteOrderById(orderId);
    if (!order) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No order found" });
    }
    return res.status(HttpStatus.OK).json({
      message: "Order successfully deleted",
      order,
    });
  }
}
