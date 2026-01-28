export type {
  Project,
  ColumnMapping,
  CreateProjectRequest,
  ProjectSummary,
} from "./projects";

export type UuidDTO = {
  uuid: string;
};

export interface PaginatedResponse<T> {
  limit: number;
  offset: number;
  next_offset: number | null;
  previous_offset: number | null;
  results: T[];
}
