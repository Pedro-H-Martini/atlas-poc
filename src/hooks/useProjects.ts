import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectByUuid, createProject, getProjectsSummary } from "@/api/projects";
import type { CreateProjectRequest, Project, ProjectSummary } from "@/types";

export function useProject(projectUuid: string | undefined) {
    return useQuery<Project>({
        queryKey: ["projects", projectUuid],
        queryFn: async () => await getProjectByUuid(projectUuid!),
        enabled: !!projectUuid,
    });
}

export function useCreateProject() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: CreateProjectRequest) => await createProject(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["projects", "summary"] });
        },
    });
}

export function useProjectsSummary() {
    return useQuery<ProjectSummary[]>({
        queryKey: ["projects", "summary"],
        queryFn: async () => await getProjectsSummary(),
    });
}