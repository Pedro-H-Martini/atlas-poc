import {api} from "argus-auth0-auth-react";
import { snakeToCamel, camelToSnake } from "@/lib/utils";

const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function getProjects() {
    const response = await api.get(`${API_BASE_URL}/api/v1/atlas/projects/`);
    return snakeToCamel(response.data);
}

export async function getProject(projectUuid: string) {
    const response = await api.get(`${API_BASE_URL}/api/v1/atlas/projects/${projectUuid}/`);
    return snakeToCamel(response.data);
}