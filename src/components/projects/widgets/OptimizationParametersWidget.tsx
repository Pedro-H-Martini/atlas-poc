import WidgetCard from "@/components/common/WidgetCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { optimizationParametersFormSchema } from "@/types/optimization-parameters";
import type { OptimizationParametersFormData } from "@/types/optimization-parameters";
import { Label } from "@/components/ui/label";
import { DateRange } from "@/components/common/DateRange";
import { Input } from "@/components/ui/input";

interface OptimizationParametersWidgetProps {
    isMaximized: boolean;
    onMaximizeToggle: () => void;
}

const onSubmit = (data: OptimizationParametersFormData) => {
    console.log(data);
    //todo: submit the data to the backend
}

export default function OptimizationParametersWidget({ isMaximized, onMaximizeToggle }: OptimizationParametersWidgetProps) {

    const { handleSubmit, control, formState: { errors }, register } = useForm<OptimizationParametersFormData>({
        resolver: zodResolver(optimizationParametersFormSchema)
    })
    return (
        <WidgetCard
            title="Optimization Parameters"
            contentClassName="flex-1 p-4 overflow-auto "
            isMaximized={isMaximized}
            onMaximizeToggle={onMaximizeToggle}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Project Dates Row - Labels */}
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-1.5">
                        <Label>Start Date</Label>
                        <Label>End Date</Label>
                    </div>
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field: startField }) => (
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field: endField }) => (
                                    <DateRange
                                        startDate={startField.value || undefined}
                                        endDate={endField.value || undefined}
                                        onStartDateChange={(date) => startField.onChange(date ?? "")}
                                        onEndDateChange={(date) => endField.onChange(date ?? "")}
                                    />
                                )}
                            />
                        )}
                    />
                    {(errors.startDate || errors.endDate) && (
                        <p className="text-xs text-red-500 mt-1.5">
                            Please select a valid date range
                        </p>
                    )}
                </div>
                {/* Distance and Duration Row */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <Label>Max Drivable Distance</Label>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("maxDrivableDistance")}
                        />
                        {errors.maxDrivableDistance && (
                            <p className="text-xs text-red-500">
                                Please enter a max drivable distance greater than 0
                            </p>
                        )}
                    </div>
                    <div className="space-y-1.5">
                        <Label>Min Team Duration</Label>
                        <Input
                            type="number"
                            step="1"
                            {...register("minTeamDuration")}
                        />
                        {errors.minTeamDuration && (
                            <p className="text-xs text-red-500">
                                Please enter a min team duration greater than 0
                            </p>
                        )}
                    </div>
                </div>
                <div className="space-y-1.5">
                    <Label>Team Work Rate</Label>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("teamWorkRate")}
                    />
                    {errors.teamWorkRate && (
                        <p className="text-xs text-red-500">
                            Please enter a team work rate greater than 0
                        </p>
                    )}
                </div>
            </form>


        </WidgetCard>
    )
}