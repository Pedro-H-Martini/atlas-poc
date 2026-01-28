"use client"

import type React from "react"
import { useState } from "react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon, X } from "lucide-react"
import { Calendar } from "../ui/calendar"



interface DateRangeProps {
    startDate: string | undefined,
    endDate: string | undefined,
    onStartDateChange: (date: string | undefined) => void,
    onEndDateChange: (date: string | undefined) => void,
    placeholder?: string,
    className?: string,
}


export const DateRange: React.FC<DateRangeProps> = ({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    className,
}) => {
    const [startOpen, setStartOpen] = useState(false)
    const [endOpen, setEndOpen] = useState(false)

    const startDateObj = startDate ? new Date(startDate + "T00:00:00") : undefined
    const endDateObj = endDate ? new Date(startDate + "T00:00:00") : undefined

    const handleStartDateChange = (date: Date | undefined) => {
        if (date) {
            onStartDateChange(format(date, "yyyy-MM-dd"))
        } else {
            onStartDateChange(undefined)
        }
        setStartOpen(false)
    }
    const handleEndDateChange = (date: Date | undefined) => {
        if (date) {
            onEndDateChange(format(date, "yyyy-MM-dd"))
        } else {
            onEndDateChange(undefined)
        }
        setEndOpen(false)
    }
    const clearStartDate = (e: React.MouseEvent) => {
        e.stopPropagation()
        onStartDateChange(undefined)
    }
    const clearEndDate = (e: React.MouseEvent) => {
        e.stopPropagation()
        onEndDateChange(undefined)
    }
    const formatDisplayDate = (dateStr: string | undefined) => {
        if (!dateStr) return undefined
        return format(new Date(dateStr + "T00:00:00"), "MMM dd, yyyy")
    }

    return (
        <div className={cn("grid grid-cols-2 gap-4", className)}>
            <Popover open={startOpen} onOpenChange={setStartOpen}>
                <PopoverTrigger asChild>
                    <button type="button" className={cn(
                        "flex h-9 w-full items-center border border-input dark:bg-input/30 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm rounded-md",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        !startDate && "text-muted-foreground",
                    )}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1 text-left">
                            {startDate ? formatDisplayDate(startDate) : "Start Date"}
                        </span>
                        {startDate && (
                            <span
                                role="button"
                                tabIndex={0}
                                className="ml-2 h-5 w-5 shrink-0 rounded-sm hover:bg-muted flex items-center justify-center cursor-pointer"
                                onClick={clearStartDate}
                                onKeyDown={(e) => e.key === "Enter" && clearStartDate(e as unknown as React.MouseEvent)}
                            >
                                <X className="h-3 w-3" />
                            </span>
                        )}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={startDateObj}
                        onSelect={handleStartDateChange}
                        disabled={(date) => {
                            if (endDateObj) {
                                return date > endDateObj
                            }
                            return false
                        }}
                    />
                </PopoverContent>
            </Popover>
            <Popover open={endOpen} onOpenChange={setEndOpen}>
                <PopoverTrigger asChild>
                    <button type="button" className={cn(
                        "flex h-9 w-full items-center border border-input dark:bg-input/30 bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm rounded-md",
                        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                        !endDate && "text-muted-foreground",
                    )}>
                        <CalendarIcon className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                        <span className="flex-1 text-left">
                            {endDate ? formatDisplayDate(endDate) : "End Date"}
                        </span>
                        {endDate && (
                            <span
                                role="button"
                                tabIndex={0}
                                className="ml-2 h-5 w-5 shrink-0 rounded-sm hover:bg-muted flex items-center justify-center cursor-pointer"
                                onClick={clearEndDate}
                                onKeyDown={(e) => e.key === "Enter" && clearEndDate(e as unknown as React.MouseEvent)}
                            >
                                <X className="h-3 w-3" />
                            </span>
                        )}
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={endDateObj}
                        onSelect={handleEndDateChange}
                        disabled={(date) => {
                            if (startDateObj) {
                                return date < startDateObj
                            }
                            return false
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}