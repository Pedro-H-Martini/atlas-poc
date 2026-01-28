import { GripVertical, Maximize2, Minimize2 } from "lucide-react"
import type { ReactNode } from "react"
import { Button } from "../ui/button"

interface WidgetCardProps {
    title: string,
    children: ReactNode,
    contentClassName?: string,
    isMaximized?: boolean,
    onMaximizeToggle?: () => void,
    headerActions?: ReactNode
}
export default function WidgetCard({
    title,
    children,
    isMaximized,
    onMaximizeToggle,
    headerActions,
    contentClassName = "flex-1 p-4 overflow-auto"
}: WidgetCardProps) {

    return (
        <div className="h-full flex flex-col rounded-lg border border-zinc-700 bg-zinc-900 overflow-auto">
            <div className="flex items-center justify-between px-3 py-2 bg-zinc-800 border-b border-zinc-700 shrink-0">
                < div className="flex items-center gap-2 min-w-0" >
                    <div className="cursor-grab active:cursor-grabbing widget-drag-handle">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-medium truncate">{title}</h3>
                </div >
                <div className="flex items-center gap-1">
                    {headerActions}
                    {onMaximizeToggle && (
                        <Button className="h-6 w-6 text-muted-foreground hover:text-white"
                            variant="ghost"
                            size="icon"
                            onClick={onMaximizeToggle}
                        >
                            {isMaximized ? (
                                <Minimize2 className="h-3.5 w-3.5" />
                            ) : (
                                <Maximize2 className="h-3.5 w-3.5" />
                            )}
                        </Button>
                    )}
                </div>
            </div >
            <div className={contentClassName}>
                {children}
            </div>
        </div >
    )
}