import WidgetCard from "@/components/common/WidgetCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export const CommercialParametersWidget = ({ isMaximized, onMaximizeToggle }: CommercialParametersWidgetProps) => {
    const { handleSubmit, formState: { errors }, register } = useForm<CommercialParametersFormData>({
        resolver: zodResolver(commercialParametersFormSchema)
    })
    return (
        <WidgetCard
            title="Commercial Parameters"
            contentClassName="flex-1 p-4 overflow-auto "
            isMaximized={isMaximized}
            onMaximizeToggle={onMaximizeToggle}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <div>
                    <Label>Daily Working Hours</Label>
                    <Input
                        type="number"
                        step="1"
                        {...register("dailyWorkingHours")}
                    />
                </div>
            </form>
        </WidgetCard>
    )
}


export default CommercialParametersWidget;