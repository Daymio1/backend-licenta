import { Body, Controller, Delete, Get, HttpStatus, Inject, Param, Patch, Post, Query, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { FilterQuery, ObjectId } from "mongoose";
import { MedicationDto } from "./dto/medication.dto";
import { MedicationsServiceInterface } from "./interfaces/medications.service.interface";

@ApiTags("medications")
@Controller("medications")
export class MedicationsController {
  constructor(@Inject("MedicationsServiceInterface") private readonly medicationsService: MedicationsServiceInterface) {}

  @Post("/create")
  async createMedication(@Res() res: Response, @Body() medicationDto: MedicationDto) {
    const medication = await this.medicationsService.createMedication(medicationDto);
    return res.status(HttpStatus.CREATED).json({
      message: "Medication successfully added",
      medication,
    });
  }

  @Get("/all")
  async getAllMedications(@Res() res: Response, @Query() medicationsFilterQuery: FilterQuery<MedicationDto>) {
    const medications = await this.medicationsService.getAllMedications(medicationsFilterQuery);
    if (!medications) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No medications found" });
    }
    return res.status(HttpStatus.OK).json(medications);
  }

  @Patch("/edit/:medicationId")
  async updateMedicationById(@Res() res: Response, @Param("medicationId") medicationId: ObjectId, @Body() medicationDto: Partial<MedicationDto>) {
    const medication = await this.medicationsService.updateMedicationById(medicationId, medicationDto);
    return res.status(HttpStatus.OK).json({
      message: "Medication successfully updated",
      medication,
    });
  }

  @Delete("/delete/:medicationId")
  async deleteMedicationById(@Res() res: Response, @Param("medicationId") medicationId: ObjectId) {
    const medication = await this.medicationsService.deleteMedicationById(medicationId);
    if (!medication) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: "No medication found" });
    }
    return res.status(HttpStatus.OK).json({
      message: "Medication successfully deleted",
      medication,
    });
  }
}
