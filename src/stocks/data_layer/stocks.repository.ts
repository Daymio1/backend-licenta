import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { Stock, StockDocument } from "./stocks.model";

@Injectable()
export class StocksRepository {
  constructor(@InjectModel(Stock.name) private stocksModel: Model<StockDocument>) {}

  async create(stock: Stock): Promise<Stock> {
    const newStock = new this.stocksModel(stock);
    return newStock.save();
  }

  async find(stockFilterQuery: FilterQuery<Stock>): Promise<Stock[]> {
    return this.stocksModel.find(stockFilterQuery);
  }

  async findById(stockId: string): Promise<Stock | null> {
    return this.stocksModel.findById({ _id: stockId });
  }

  async findByIdAndUpdate(stockId: ObjectId, stock: Partial<Stock>): Promise<Stock | null> {
    return this.stocksModel.findByIdAndUpdate({ _id: stockId }, stock, { new: true });
  }

  async findByIdAndDelete(stockId: ObjectId): Promise<Stock | null> {
    return this.stocksModel.findByIdAndDelete({ _id: stockId });
  }
}
