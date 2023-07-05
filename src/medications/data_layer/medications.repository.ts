import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, ObjectId } from "mongoose";
import { Medication, MedicationDocument } from "./medications.model";

@Injectable()
export class MedicationsRepository {
  constructor(@InjectModel(Medication.name) private medicationsModel: Model<MedicationDocument>) {}

  async create(medication: Medication): Promise<Medication> {
    const newMedication = new this.medicationsModel(medication);
    return newMedication.save();
  }

  async find(medicationsFilterQuery: FilterQuery<Medication>): Promise<Medication[]> {
    const searchOption = medicationsFilterQuery.s && {
      $or: [
        {
          name: new RegExp(medicationsFilterQuery.s.toString(), "i"),
        },
      ],
    };

    const field = medicationsFilterQuery.field && medicationsFilterQuery.field.toString();
    const sort = medicationsFilterQuery.sort && medicationsFilterQuery.sort.toString();
    const sortOption = { [field]: sort };

    return this.medicationsModel.find(searchOption).sort(sortOption);
  }

  async findById(medicationId: string): Promise<Medication | null> {
    return this.medicationsModel.findById({ _id: medicationId });
  }

  async findByIdAndUpdate(medicationsId: ObjectId, medication: Partial<Medication>): Promise<Medication | null> {
    return this.medicationsModel.findByIdAndUpdate({ _id: medicationsId }, medication, { new: true });
  }

  async findByIdAndDelete(medicationsId: ObjectId): Promise<Medication | null> {
    return this.medicationsModel.findByIdAndDelete({ _id: medicationsId });
  }
}
