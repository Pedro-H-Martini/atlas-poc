import { api } from "argus-auth0-auth-react";
import { snakeToCamel } from "@/lib/utils";
import type {
  CreateProjectRequest,
  PaginatedResponse,
  Project,
  ProjectSummary,
  UuidDTO,
} from "@/types/index";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function getProjects(): Promise<Project[]> {
  const response = await api.get<Project[]>(
    `${API_BASE_URL}/api/v1/atlas/projects/`,
  );
  return snakeToCamel(response.data) as Project[];
}

export async function getProjectByUuid(projectUuid: string): Promise<Project> {
  const response = await api.get<Project>(
    `${API_BASE_URL}/api/v1/atlas/projects/${projectUuid}/`,
  );
  return snakeToCamel(response.data) as Project;
}

export async function createProject(
  data: CreateProjectRequest,
): Promise<UuidDTO> {
  const formData = new FormData();

  formData.append("csv_file", data.csvFile);
  formData.append("name", data.name);
  formData.append("mapping", JSON.stringify(data.mapping));

  const response = await api.post<UuidDTO>(
    `${API_BASE_URL}/api/v1/atlas/projects/`,
    formData,
  );
  return snakeToCamel(response.data) as UuidDTO;
}

export async function getProjectsSummary(): Promise<ProjectSummary[]> {
  const response = await api.get<PaginatedResponse<ProjectSummary>>(
    `${API_BASE_URL}/api/v1/atlas/projects/`,
  );
  return snakeToCamel(response.data.results) as ProjectSummary[];
}
