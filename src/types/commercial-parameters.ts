import { z } from "zod";

export const commercialParametersFormSchema = z.object({
  // Labor Rates
  hourlyLaborFee: z.number().min(1),
  hourlyLeaderFee: z.number().min(1),
  hourlyLaborCost: z.number().min(1),
  hourlyLeaderCost: z.number().min(1),
  dailyManagerFee: z.number().min(1),
  dailyManagerCost: z.number().min(1),
  dailyWorkingHours: z.number().min(1).max(24),
  // Travel Costs
  hotelRate: z.number().min(0),
  perDiem: z.number().min(0),
  shortFlightCost: z.number().min(0),
  mediumFlightCost: z.number().min(0),
  longFlightCost: z.number().min(0),
  dailyLeaderTransportation: z.number().min(0),
  dailyLaborTransportation: z.number().min(0),
  // Team Counts
  numWorkers: z.number().min(0),
  numLeaders: z.number().min(0),
  numManagers: z.number().min(0),
  // Equipment & Materials
  additionalCostPerTeam: z.number().min(0),
  additionalCostPerItem: z.number().min(0),
});

export type CommercialParametersFormData = z.infer<
  typeof commercialParametersFormSchema
>;

// Default values matching backend defaults
export const commercialParametersDefaults: CommercialParametersFormData = {
  hourlyLaborFee: 25,
  hourlyLeaderFee: 40,
  hourlyLaborCost: 20,
  hourlyLeaderCost: 35,
  dailyManagerFee: 110,
  dailyManagerCost: 80,
  dailyWorkingHours: 8,
  hotelRate: 120,
  perDiem: 50,
  shortFlightCost: 300,
  mediumFlightCost: 450,
  longFlightCost: 600,
  dailyLeaderTransportation: 60,
  dailyLaborTransportation: 25,
  numWorkers: 1,
  numLeaders: 1,
  numManagers: 1,
  additionalCostPerTeam: 2000,
  additionalCostPerItem: 10,
};
