export interface Project {
  uuid: string;
  name: string;
  stage: string;
  optimizationParameters?: OptimizationParameters;
  commercialParameters?: CommercialParameters;
  sites: any[];
  createdAt: string;
  updatedAt: string;
  totalSites: number;
  totalItems: number;
  totalVoidedItems: number;
}

export interface ColumnMapping {
  code: string;
  address: string;
  city: string;
  state: string;
  workItems: string;
}

export interface CreateProjectRequest {
  name: string;
  mapping: ColumnMapping;
  csvFile: File;
}

export interface ProjectSummary {
  uuid: string;
  name: string;
  stage: string;
  totalSites: number;
  totalVoidedWorkItems: number;
  totalWorkItems: number;
  updatedAt: string;
}

export interface OptimizationParameters {
  startDate: string;
  endDate: string;
  maxDrivableDistance: number;
  minTeamDuration: number;
  teamWorkRate: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CommercialParameters {
  dailyWorkingHours: number;
  hourlyLaborFee: number;
  hourlyLeaderFee: number;
  dailyManagerFee: number;
  hourlyLaborCost: number;
  hourlyLeaderCost: number;
  dailyManagerCost: number;
  numWorkers: number;
  numLeaders: number;
  numManagers: number;
  nightlyLodgingRate: number;
  perDiemRate: number;
  shortFlightCost: number;
  mediumFlightCost: number;
  longFlightCost: number;
  dailyLeaderTransportation: number;
  dailyLaborTransportation: number;
  equipmentMaterialCost: number;
  equipmentMaterialList: any;
  createdAt: string;
  updatedAt: string;
}
