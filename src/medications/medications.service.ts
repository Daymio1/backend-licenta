import { Injectable } from "@nestjs/common";
import { FilterQuery, ObjectId } from "mongoose";
import { Medication } from "./data_layer/medications.model";
import { MedicationsRepository } from "./data_layer/medications.repository";
import { MedicationDto } from "./dto/medication.dto";
import { MedicationsServiceInterface } from "./interfaces/medications.service.interface";

@Injectable()
export class MedicationsService implements MedicationsServiceInterface {
  constructor(private readonly medicationsRepository: MedicationsRepository) {}

  async createMedication(medicationDto: MedicationDto): Promise<Medication> {
    return this.medicationsRepository.create(medicationDto);
  }

  async getAllMedications(medicationsFilterQuery: FilterQuery<MedicationDto>): Promise<Medication[]> {
    return this.medicationsRepository.find(medicationsFilterQuery);
  }

  async updateMedicationById(medicationsId: ObjectId, medication: Partial<Medication>): Promise<Medication | null> {
    return this.medicationsRepository.findByIdAndUpdate(medicationsId, medication);
  }

  async deleteMedicationById(medicationsId: ObjectId): Promise<Medication | null> {
    return this.medicationsRepository.findByIdAndDelete(medicationsId);
  }
}
