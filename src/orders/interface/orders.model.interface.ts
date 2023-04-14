export interface MedicationPrescribed {
  medicationId: string;
  medicationQuantity: number;
}

export enum OrderStatus {
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  IN_PROGRESS = "IN PROGRESS",
  READY = "READY",
  COMPLETED = "COMPLETED",
}
