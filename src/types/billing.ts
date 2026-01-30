export interface CommercialSummaryData {
  // Left Column: Client Billing
  totalFee: number;
  laborFee: number;
  travelFee: number;
  lodgingFee: number;
  perDiemFee: number;
  flightFee: number;
  transportationFee: number;
  equipmentMaterialFee: number;

  // Right Column: PAC Costs
  totalCost: number;
  laborCost: number;
  travelCost: number;
  lodgingCost: number;
  perDiemCost: number;
  flightCost: number;
  transportationCost: number;
  equipmentMaterialCost: number;
  grossMargin: number;
  costPerWorkItem: number;

  //New Summary Metrics
  totalWorkers: number;
  totalWorkDays: number;
  totalWorkItems: number;
  totalTravelDays: number;
  totalWorkHours: number;
}
