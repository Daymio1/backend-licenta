import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { Stock, StockDocument } from "./stocks.model";
import { Medication, MedicationDocument } from "src/medications/data_layer/medications.model";

@Injectable()
export class StocksRepository {
  constructor(@InjectModel(Stock.name) private stocksModel: Model<StockDocument>, @InjectModel(Medication.name) private medicationModel: Model<MedicationDocument>) {}

  async create(stock: Stock): Promise<Stock> {
    const newStock = new this.stocksModel(stock);
    return newStock.save();
  }

  async find(stockFilterQuery: FilterQuery<Stock>): Promise<Stock[]> {
    const searchOption = stockFilterQuery.s && {
      $or: [
        {
          name: new RegExp(stockFilterQuery.s.toString(), "i"),
        },
      ],
    };

    const field = stockFilterQuery.field && stockFilterQuery.field.toString();
    const sort = stockFilterQuery.sort && stockFilterQuery.sort.toString();
    const sortOption = { [field]: sort };

    const allStocks = await this.stocksModel.find();
    const meds = await this.medicationModel.find(searchOption).sort(sortOption);

    const sortedStocks: Stock[] = [];
    stockFilterQuery.sort &&
      meds.map(med =>
        allStocks.map(stock => {
          if (stock.medicationId === med._id.toString()) sortedStocks.push(stock);
        }),
      );
    console.log(sortedStocks);
    const filteredStocks: Stock[] = [];
    meds.map(med =>
      allStocks.map(stock => {
        if (stock.medicationId === med._id.toString()) filteredStocks.push(stock);
      }),
    );

    return stockFilterQuery.s ? filteredStocks : stockFilterQuery.sort ? sortedStocks : this.stocksModel.find().sort(sortOption);
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
