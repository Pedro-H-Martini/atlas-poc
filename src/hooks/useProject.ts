import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/api/projects";

export function useProject(projectUuid: string) {
    return useQuery({
        queryKey: ["project", projectUuid],
        queryFn: () => getProject(projectUuid),
    });
}