import { FilterQuery, ObjectId } from "mongoose";
import { Medication } from "../data_layer/medications.model";
import { MedicationDto } from "../dto/medication.dto";

export interface MedicationsServiceInterface {
  createMedication(medicationDto: MedicationDto): Promise<Medication>;
  getAllMedications(medicationsFilterQuery: FilterQuery<MedicationDto>): Promise<Medication[]>;
  updateMedicationById(medicationsId: ObjectId, medication: Partial<Medication>): Promise<Medication | null>;
  deleteMedicationById(medicationsId: ObjectId): Promise<Medication | null>;
}
