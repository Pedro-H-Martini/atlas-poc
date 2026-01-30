import WidgetCard from "@/components/common/WidgetCard";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState, useMemo } from "react";
import type { CommercialSummaryData } from "@/types/billing";


interface CommercialSummaryWidgetProps {
    data?: CommercialSummaryData;
    isMaximized: boolean;
    onMaximizeToggle: () => void;
}

const generateRandomValue = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

export default function CommercialSummaryWidget({ data, isMaximized, onMaximizeToggle }: CommercialSummaryWidgetProps) {
    const [hideValues, setHideValues] = useState(false);

    // Generate stable random default values
    const defaultValues = useMemo(() => ({
        totalFee: generateRandomValue(10000, 50000),
        laborFee: generateRandomValue(3000, 15000),
        travelFee: generateRandomValue(500, 3000),
        lodgingFee: generateRandomValue(500, 2000),
        perDiemFee: generateRandomValue(200, 1000),
        flightFee: generateRandomValue(300, 2000),
        transportationFee: generateRandomValue(200, 1500),
        equipmentMaterialFee: generateRandomValue(1000, 5000),
        totalCost: generateRandomValue(8000, 40000),
        laborCost: generateRandomValue(2000, 12000),
        travelCost: generateRandomValue(400, 2500),
        lodgingCost: generateRandomValue(400, 1800),
        perDiemCost: generateRandomValue(150, 800),
        flightCost: generateRandomValue(250, 1800),
        transportationCost: generateRandomValue(150, 1200),
        equipmentMaterialCost: generateRandomValue(800, 4000),
    }), []);

    return (
        <WidgetCard title="Commercial Summary" headerActions={
            !data && (
                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white" onClick={() => setHideValues(!hideValues)} title={hideValues ? "Show values" : "Hide values"}>
                    {hideValues ? (
                        <EyeOff className="h-3.5 w-3.5" />
                    ) : (
                        <Eye className="h-3.5 w-3.5" />
                    )}
                </ Button>
            )
        } isMaximized={isMaximized} onMaximizeToggle={onMaximizeToggle}>
            <div>


                {hideValues && (
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Labor Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Travel Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Lodging Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Per Diem Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Flight Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Transportation Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Equipment & Material Fee:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Total Fee:</span> <span>••••••</span></p>
                        </div>
                        <div>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Labor Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Travel Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Lodging Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Per Diem Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Flight Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Transportation Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Equipment & Material Cost:</span> <span>••••••</span></p>
                            <p className="text-sm font-bold flex justify-between items-baseline"><span>Total Cost:</span> <span>••••••</span></p>
                        </div>
                    </div>
                )}
                {!hideValues && (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2 text-sm font-bold">
                            <p className="flex justify-between items-baseline"><span>Labor Fee:</span> <span>{data?.laborFee ?? defaultValues.laborFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Travel Fee:</span> <span>{data?.travelFee ?? defaultValues.travelFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Lodging Fee:</span> <span>{data?.lodgingFee ?? defaultValues.lodgingFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Per Diem Fee:</span> <span>{data?.perDiemFee ?? defaultValues.perDiemFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Flight Fee:</span> <span>{data?.flightFee ?? defaultValues.flightFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Transportation Fee:</span> <span>{data?.transportationFee ?? defaultValues.transportationFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Equipment & Material Fee:</span> <span>{data?.equipmentMaterialFee ?? defaultValues.equipmentMaterialFee}</span></p>
                            <p className="flex justify-between items-baseline"><span>Total Fee:</span> <span>{data?.totalFee ?? defaultValues.totalFee}</span></p>
                        </div>
                        <div className="space-y-2 text-sm font-bold">
                            <p className="flex justify-between items-baseline"><span>Labor Cost:</span> <span>{data?.laborCost ?? defaultValues.laborCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Travel Cost:</span> <span>{data?.travelCost ?? defaultValues.travelCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Lodging Cost:</span> <span>{data?.lodgingCost ?? defaultValues.lodgingCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Per Diem Cost:</span> <span>{data?.perDiemCost ?? defaultValues.perDiemCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Flight Cost:</span> <span>{data?.flightCost ?? defaultValues.flightCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Transportation Cost:</span> <span>{data?.transportationCost ?? defaultValues.transportationCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Equipment & Material Cost:</span> <span>{data?.equipmentMaterialCost ?? defaultValues.equipmentMaterialCost}</span></p>
                            <p className="flex justify-between items-baseline"><span>Total Cost:</span> <span>{data?.totalCost ?? defaultValues.totalCost}</span></p>
                        </div>

                    </div>
                )}
            </div>
        </WidgetCard>
    )
}