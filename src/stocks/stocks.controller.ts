import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Res, UseGuards, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";
import { StocksService } from "./stocks.service";
import { StockDto } from "./dto/stock.dto";
import { FilterQuery, ObjectId } from "mongoose";

@ApiTags("stocks")
@Controller("stocks")
export class StocksController {
  constructor(@Inject("StocksServiceInterface") private readonly stocksService: StocksService) {}

  @UseGuards(AuthGuard("jwt"))
  @Post("/create")
  async createStock(@Res() res: Response, @Body() stockDto: StockDto) {
    const stock = await this.stocksService.createStock(stockDto);
    return res.status(HttpStatus.CREATED).json({ message: "Stock successfully added", stock });
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/all")
  async getAllStocks(@Res() res: Response, @Query() stocksFilterQuery: FilterQuery<StockDto>) {
    const stocks = await this.stocksService.getAllStocks(stocksFilterQuery);
    if (!stocks) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No stocks found" });
    }
    return res.status(HttpStatus.OK).json(stocks);
  }

  @UseGuards(AuthGuard("jwt"))
  @Get("/:stockId")
  async getStockById(@Res() res: Response, @Param("stockId") stockId: string) {
    const stock = await this.stocksService.getStockById(stockId);
    if (!stock) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No stock found" });
    }
    return res.status(HttpStatus.OK).json(stock);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch("/edit/:stockId")
  async updateStockById(@Res() res: Response, @Param("stockId") stockId: ObjectId, @Body() stockDto: Partial<StockDto>) {
    const stock = await this.stocksService.updateStockById(stockId, stockDto);
    if (!stock) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No stock found" });
    }
    return res.status(HttpStatus.OK).json({
      message: "Stock successfully updated",
      stock,
    });
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete("/delete/:stockId")
  async deleteStockById(@Res() res: Response, @Param("stockId") stockId: ObjectId) {
    const stock = await this.stocksService.deleteStockById(stockId);
    if (!stock) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No stock found" });
    }
    return res.status(HttpStatus.OK).json({
      message: "Stock successfully deleted",
      stock,
    });
  }
}
