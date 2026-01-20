import { useCallback, useMemo, useRef, useState } from "react"
import type { LayoutItem } from "react-grid-layout"

export type Layouts = Record<string, LayoutItem[]>

export interface UseResponsiveGridLayoutOptions {
    initialLayouts: Record<string, LayoutItem[]>
    rowHeight?: number
    margin?: number
    breakpoints?: { lg: number; md: number; sm: number; xs: number; xxs: number }
    cols?: { lg: number; md: number; sm: number; xs: number; xxs: number }
}

export interface UseResponsiveGridLayoutReturn {
    isVisible: (panelId: string) => boolean
    toggleMaximize: (panelId: string) => void
    handleGridLayoutChange: (currentLayout: readonly LayoutItem[], allLayouts: Partial<Record<string, readonly LayoutItem[]>>) => void
    containerRef: (node: HTMLDivElement | null) => void
    width: number
    height: number
    mounted: boolean
    maximizedPanels: string[]
    currentLayouts: Layouts
}

export function useResponsiveGridLayout(options: UseResponsiveGridLayoutOptions): UseResponsiveGridLayoutReturn {
    const { initialLayouts, rowHeight = 30, margin = 10, breakpoints = { 
        lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 
    }, cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 } } = options

const [actualLayouts,setActualLayouts] = useState<Layouts>(initialLayouts)
const [width,setWidth] = useState(0)
const [height,setHeight] = useState(0)
const [mounted,setMounted] = useState(false)
const [maximizedPanels,setMaximizedPanels] = useState<string[]>([])
const observerRef = useRef<ResizeObserver | null>(null)
const dimensionsRef = useRef({ width: 0, height: 0 })

const containerRef = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
    }
    if (node) {
        observerRef.current = new ResizeObserver((entries) => {
            const entry = entries[0]
            if (entry) {
                const { width: newWidth, height: newHeight } = entry.contentRect
                if (Math.abs(newWidth - dimensionsRef.current.width) > 1 ||
                 Math.abs(newHeight - dimensionsRef.current.height) > 1) {
                    dimensionsRef.current = { width: newWidth, height: newHeight }
                    requestAnimationFrame(() => {
                        setWidth(newWidth)
                        setHeight(newHeight)
                        setMounted(true)
                    })
                }
            }
        })
        observerRef.current.observe(node)
        const initialWidth = node.offsetWidth
        const initialHeight = node.offsetHeight
        dimensionsRef.current = { width: initialWidth, height: initialHeight }
        setWidth(initialWidth)
        setHeight(initialHeight)
        setMounted(true)
    }
}, [])

const toggleMaximize = useCallback((panelId: string) => {
    setMaximizedPanels((prev) =>
        prev.includes(panelId) ? prev.filter((id) => id !== panelId) : [...prev, panelId]
    )
}, [])

const handleGridLayoutChange = useCallback(
    (_: readonly LayoutItem[], allLayouts: Partial<Record<string, readonly LayoutItem[]>>) => {
        // Only update actual layouts when no panels are maximized
        if (maximizedPanels.length === 0) {
            // Convert Partial<Record> to Layouts by filtering out undefined values and converting readonly to mutable
            const layouts: Layouts = {}
            Object.keys(allLayouts).forEach((key) => {
                const layout = allLayouts[key]
                if (layout) {
                    layouts[key] = [...layout] // Convert readonly array to mutable array
                }
            })
            setActualLayouts(layouts)
        }
    },
    [maximizedPanels.length]
)

const currentLayouts = useMemo(() => {
    if (maximizedPanels.length === 0) return actualLayouts

    // React-grid-layout height = rowHeight * h + margin * (h - 1)
    // Solving for h: rows = (height + margin) / (rowHeight + margin)
    const rows = Math.max(1, Math.floor((height + margin) / (rowHeight + margin)))

    const getLayoutForBreakpoint = (breakpointLayout: LayoutItem[]) => {
        return breakpointLayout.map((item) => {
            if (maximizedPanels.includes(item.i)) {
                return { ...item, y: 0, h: rows, static: true }
            }

            // Check if item overlaps in X-axis with ANY maximized item
            const overlapsWithAnyMaximized = maximizedPanels.some((maxId) => {
                const maximizedItem = breakpointLayout.find((l) => l.i === maxId)
                if (!maximizedItem) return false
                return (
                    item.x < maximizedItem.x + maximizedItem.w &&
                    item.x + item.w > maximizedItem.x
                )
            })

            if (overlapsWithAnyMaximized) {
                // If it overlaps in X with a maximized panel, it should be moved/hidden
                return { ...item, y: rows + 1, static: true }
            }

            // Non-overlapping panels in other columns stay visible
            return { ...item, static: true }
        })
    }

    // Prepare maximized layouts for all breakpoints based on current actualLayouts
    const res: Layouts = {}
    Object.keys(actualLayouts).forEach((key) => {
        res[key] = getLayoutForBreakpoint(
            (actualLayouts as any)[key] as LayoutItem[]
        )
    })

    // Ensure all breakpoints are covered
    const breakpointKeys: (keyof typeof actualLayouts)[] = [
        "lg",
        "md",
        "sm",
        "xs",
        "xxs",
    ]

    breakpointKeys.forEach((bp) => {
        if (!res[bp]) {
            res[bp] = getLayoutForBreakpoint(
                ((actualLayouts as any).lg || []) as LayoutItem[]
            )
        }
    })

    return res
}, [maximizedPanels, actualLayouts, height, rowHeight, margin])

const isVisible = useCallback((panelId: string) => {
    if (maximizedPanels.length === 0) return true
    if (maximizedPanels.includes(panelId)) return true

    const layout = (actualLayouts.lg || []) as LayoutItem[]
    const item = layout.find((l) => l.i === panelId)
    if (!item) return true

    // Check if it overlaps in X with ANY maximized item
    const overlapsWithAnyMaximized = maximizedPanels.some((maxId) => {
        const maximizedItem = layout.find((l) => l.i === maxId)
        if (!maximizedItem) return false
        return (
            item.x < maximizedItem.x + maximizedItem.w &&
            item.x + item.w > maximizedItem.x
        )
    })

    return !overlapsWithAnyMaximized
}, [maximizedPanels, actualLayouts])

return {
    width,
    height,
    mounted,
    maximizedPanels,
    currentLayouts,
    containerRef,
    toggleMaximize,
    handleGridLayoutChange,
    isVisible,
}
}