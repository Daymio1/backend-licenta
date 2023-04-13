import { Injectable } from "@nestjs/common";
import { FilterQuery, ObjectId } from "mongoose";
import { MedicationsRepository } from "src/medications/data_layer/medications.repository";
import { Stock } from "./data_layer/stocks.model";
import { StocksRepository } from "./data_layer/stocks.repository";
import { StockDto } from "./dto/stock.dto";
import { StocksServiceInterface } from "./interfaces/stocks.service.interface";

@Injectable()
export class StocksService implements StocksServiceInterface {
  constructor(private readonly stocksRepository: StocksRepository, private readonly medicationsRepository: MedicationsRepository) {}

  async isValidDate(expirationDate: Date) {
    if (new Date() >= new Date(expirationDate)) {
      throw new Error("Invalid date input!");
    }
  }

  async createStock(stockDto: StockDto): Promise<Stock> {
    this.isValidDate(stockDto.expirationDate);
    const medication = await this.medicationsRepository.findById(stockDto.medicationId);
    if (!medication) {
      throw new Error("Medication not available in data base.");
    }
    return this.stocksRepository.create(stockDto);
  }

  async getAllStocks(stockFilterQuery: FilterQuery<StockDto>): Promise<Stock[]> {
    return this.stocksRepository.find(stockFilterQuery);
  }

  async getStockById(stockId: string): Promise<Stock | null> {
    return this.stocksRepository.findById(stockId);
  }

  async updateStockById(stockId: ObjectId, stock: Partial<Stock>): Promise<Stock | null> {
    return this.stocksRepository.findByIdAndUpdate(stockId, stock);
  }

  async deleteStockById(stockId: ObjectId): Promise<Stock | null> {
    return this.stocksRepository.findByIdAndDelete(stockId);
  }
}
