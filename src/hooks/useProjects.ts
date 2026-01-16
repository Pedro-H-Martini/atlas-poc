import { useQuery } from "@tanstack/react-query";
import { getProjectByUuid } from "@/api/projects";
import type { Project } from "@/types";

export function useProject(projectUuid: string | undefined) {
    return useQuery<Project>({
        queryKey: ["projects", projectUuid],
        queryFn: async () => await getProjectByUuid(projectUuid!),
        enabled: !!projectUuid,
    });
}