import WidgetCard from "@/components/common/WidgetCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CommercialParametersFormData } from "@/types/commercial-parameters";
import {
    commercialParametersFormSchema,
    commercialParametersDefaults,
} from "@/types/commercial-parameters";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface CommercialParametersWidgetProps {
    isMaximized: boolean;
    onMaximizeToggle: () => void;
}

export const CommercialParametersWidget = ({ isMaximized, onMaximizeToggle }: CommercialParametersWidgetProps) => {
    const [activeTab, setActiveTab] = useState<string>("labor");
    const {
        handleSubmit,
        formState: { errors },
        register,
    } = useForm<CommercialParametersFormData>({
        resolver: zodResolver(commercialParametersFormSchema),
        defaultValues: commercialParametersDefaults,
    });

    const onSubmit = (data: CommercialParametersFormData) => {
        console.log("Commercial Parameters:", data);
        // TODO: API call to save
    };

    return (
        <WidgetCard
            title="Commercial Parameters"
            contentClassName="flex-1 p-4 overflow-auto"
            isMaximized={isMaximized}
            onMaximizeToggle={onMaximizeToggle}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="bg-transparent border-b border-zinc-800 w-full justify-start min-w-max">
                            <TabsTrigger value="labor">Labor</TabsTrigger>
                            <TabsTrigger value="travel">Travel</TabsTrigger>
                            <TabsTrigger value="equipmentMaterials">Equipment & Materials</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {/* Labor Rates Section */}
                {activeTab === "labor" && (
                    <>

                        <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="numWorkers">Number of Workers</Label>
                                    <Input
                                        id="numWorkers"
                                        type="number"
                                        min="1"
                                        {...register("numWorkers", { valueAsNumber: true })}
                                    />
                                    {errors.numWorkers && (
                                        <p className="text-xs text-red-500">{errors.numWorkers.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="numLeaders">Number of Leaders</Label>
                                    <Input
                                        id="numLeaders"
                                        type="number"
                                        min="1"
                                        {...register("numLeaders", { valueAsNumber: true })}
                                    />
                                    {errors.numLeaders && (
                                        <p className="text-xs text-red-500">{errors.numLeaders.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="numManagers">Number of Managers</Label>
                                    <Input
                                        id="numManagers"
                                        type="number"
                                        min="1"
                                        {...register("numManagers", { valueAsNumber: true })}
                                    />
                                    {errors.numManagers && (
                                        <p className="text-xs text-red-500">{errors.numManagers.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        < div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="hourlyLaborFee">Hourly Labor Fee ($)</Label>
                                    <Input
                                        id="hourlyLaborFee"
                                        type="number"
                                        min="0"
                                        {...register("hourlyLaborFee", { valueAsNumber: true })}
                                    />
                                    {errors.hourlyLaborFee && (
                                        <p className="text-xs text-red-500">{errors.hourlyLaborFee.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="hourlyLaborCost">Hourly Labor Cost ($)</Label>
                                    <Input
                                        id="hourlyLaborCost"
                                        type="number"
                                        min="0"
                                        {...register("hourlyLaborCost", { valueAsNumber: true })}
                                    />
                                    {errors.hourlyLaborCost && (
                                        <p className="text-xs text-red-500">{errors.hourlyLaborCost.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="hourlyLeaderFee">Hourly Leader Fee ($)</Label>
                                    <Input
                                        id="hourlyLeaderFee"
                                        type="number"
                                        min="0"
                                        {...register("hourlyLeaderFee", { valueAsNumber: true })}
                                    />
                                    {errors.hourlyLeaderFee && (
                                        <p className="text-xs text-red-500">{errors.hourlyLeaderFee.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="hourlyLeaderCost">Hourly Leader Cost ($)</Label>
                                    <Input
                                        id="hourlyLeaderCost"
                                        type="number"
                                        min="0"
                                        {...register("hourlyLeaderCost", { valueAsNumber: true })}
                                    />
                                    {errors.hourlyLeaderCost && (
                                        <p className="text-xs text-red-500">{errors.hourlyLeaderCost.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="dailyManagerFee">Daily Manager Fee ($)</Label>
                                    <Input
                                        id="dailyManagerFee"
                                        type="number"
                                        min="0"
                                        {...register("dailyManagerFee", { valueAsNumber: true })}
                                    />
                                    {errors.dailyManagerFee && (
                                        <p className="text-xs text-red-500">{errors.dailyManagerFee.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="dailyManagerCost">Daily Manager Cost ($)</Label>
                                    <Input
                                        id="dailyManagerCost"
                                        type="number"
                                        min="0"
                                        {...register("dailyManagerCost", { valueAsNumber: true })}
                                    />
                                    {errors.dailyManagerCost && (
                                        <p className="text-xs text-red-500">{errors.dailyManagerCost.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="dailyWorkingHours">Daily Working Hours</Label>
                                    <Input
                                        id="dailyWorkingHours"
                                        type="number"
                                        min="1"
                                        max="24"
                                        {...register("dailyWorkingHours", { valueAsNumber: true })}
                                    />
                                    {errors.dailyWorkingHours && (
                                        <p className="text-xs text-red-500">{errors.dailyWorkingHours.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>


                    </>
                )}


                {/* Travel Costs Section */}
                {activeTab === "travel" && (
                    <>
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground">Travel Costs</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="hotelRate">Hotel Rate per Night ($)</Label>
                                    <Input
                                        id="hotelRate"
                                        type="number"
                                        min="0"
                                        {...register("hotelRate", { valueAsNumber: true })}
                                    />
                                    {errors.hotelRate && (
                                        <p className="text-xs text-red-500">{errors.hotelRate.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="perDiem">Per Diem per Person ($)</Label>
                                    <Input
                                        id="perDiem"
                                        type="number"
                                        min="0"
                                        {...register("perDiem", { valueAsNumber: true })}
                                    />
                                    {errors.perDiem && (
                                        <p className="text-xs text-red-500">{errors.perDiem.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="shortFlightCost">Short Flight (200-500 mi) ($)</Label>
                                    <Input
                                        id="shortFlightCost"
                                        type="number"
                                        min="0"
                                        {...register("shortFlightCost", { valueAsNumber: true })}
                                    />
                                    {errors.shortFlightCost && (
                                        <p className="text-xs text-red-500">{errors.shortFlightCost.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="mediumFlightCost">Medium Flight (500-1000 mi) ($)</Label>
                                    <Input
                                        id="mediumFlightCost"
                                        type="number"
                                        min="0"
                                        {...register("mediumFlightCost", { valueAsNumber: true })}
                                    />
                                    {errors.mediumFlightCost && (
                                        <p className="text-xs text-red-500">{errors.mediumFlightCost.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="longFlightCost">Long Flight (1000+ mi) ($)</Label>
                                    <Input
                                        id="longFlightCost"
                                        type="number"
                                        min="0"
                                        {...register("longFlightCost", { valueAsNumber: true })}
                                    />
                                    {errors.longFlightCost && (
                                        <p className="text-xs text-red-500">{errors.longFlightCost.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="dailyLeaderTransportation">Leader Daily Transport ($)</Label>
                                    <Input
                                        id="dailyLeaderTransportation"
                                        type="number"
                                        min="0"
                                        {...register("dailyLeaderTransportation", { valueAsNumber: true })}
                                    />
                                    {errors.dailyLeaderTransportation && (
                                        <p className="text-xs text-red-500">{errors.dailyLeaderTransportation.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="dailyLaborTransportation">Labor Daily Transport ($)</Label>
                                    <Input
                                        id="dailyLaborTransportation"
                                        type="number"
                                        min="0"
                                        {...register("dailyLaborTransportation", { valueAsNumber: true })}
                                    />
                                    {errors.dailyLaborTransportation && (
                                        <p className="text-xs text-red-500">{errors.dailyLaborTransportation.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Equipment & Materials Section */}
                {activeTab === "equipmentMaterials" && (
                    <>
                        <div className="space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground">Equipment & Materials</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="additionalCostPerTeam">Tools Cost per Team ($)</Label>
                                    <Input
                                        id="additionalCostPerTeam"
                                        type="number"
                                        min="0"
                                        {...register("additionalCostPerTeam", { valueAsNumber: true })}
                                    />
                                    {errors.additionalCostPerTeam && (
                                        <p className="text-xs text-red-500">{errors.additionalCostPerTeam.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="additionalCostPerItem">Consumables per Item ($)</Label>
                                    <Input
                                        id="additionalCostPerItem"
                                        type="number"
                                        min="0"
                                        {...register("additionalCostPerItem", { valueAsNumber: true })}
                                    />
                                    {errors.additionalCostPerItem && (
                                        <p className="text-xs text-red-500">{errors.additionalCostPerItem.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </form>
        </WidgetCard >
    );
};

export default CommercialParametersWidget;