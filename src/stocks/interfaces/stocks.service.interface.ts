import { FilterQuery, ObjectId } from "mongoose";
import { Stock } from "../data_layer/stocks.model";
import { StockDto } from "../dto/stock.dto";

export interface StocksServiceInterface {
  isValidDatePipe(expirationDate: Date): Promise<void>;
  createStock(stockDto: StockDto): Promise<Stock>;
  getAllStocks(stockFilterQuery: FilterQuery<StockDto>): Promise<Stock[]>;
  getStockById(stockId: string): Promise<Stock | null>;
  updateStockById(stockId: ObjectId, stock: Partial<Stock>): Promise<Stock | null>;
  deleteStockById(stockId: ObjectId): Promise<Stock | null>;
}
