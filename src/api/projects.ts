import {api} from "argus-auth0-auth-react";
import { snakeToCamel } from "@/lib/utils"; 
import type { Project } from "@/types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function getProjects(): Promise<Project[]> {
    const response = await api.get<Project[]>(`${API_BASE_URL}/api/v1/atlas/projects/`);
    return snakeToCamel(response.data) as Project[];
}

export async function getProjectByUuid(projectUuid: string): Promise<Project> {
    const response = await api.get<Project>(`${API_BASE_URL}/api/v1/atlas/projects/${projectUuid}/`);
    return snakeToCamel(response.data) as Project;
}