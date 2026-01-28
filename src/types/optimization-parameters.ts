import { z } from "zod";

export const optimizationParametersFormSchema = z.object({
  startDate: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Start date is required" : undefined,
    })
    .min(1, "Start date is required"),
  endDate: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "End date is required" : undefined,
    })
    .min(1, "End date is required"),
  maxDrivableDistance: z
    .string({})
    .min(1, "Max drivable distance is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Must be a positive number",
    }),
  minTeamDuration: z
    .string()
    .min(1, "Min team duration is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Must be a positive number",
    }),
  teamWorkRate: z
    .string()
    .min(1, "Team work rate is required")
    .refine((val) => !isNaN(Number(val)) && Number(val) >= 1, {
      message: "Must be a positive number",
    }),
  algorithm: z.enum(["solver_facility", "hybrid"]),
  detectOutliers: z.boolean(),
  targetUtilizationPct: z.number().min(0.5).max(1),
});

export type OptimizationParametersFormData = z.infer<
  typeof optimizationParametersFormSchema
>;
