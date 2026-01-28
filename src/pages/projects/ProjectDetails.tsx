import { PageHeader } from "@/components/layout/PageHeader";
import OptimizationParametersWidget from "@/components/projects/widgets/OptimizationParametersWidget";
import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/useProjects";
import { useResponsiveGridLayout } from "@/hooks/useResponsiveGridLayout";
import { Loader2 } from "lucide-react";
import { useMemo } from "react";
import { Responsive } from "react-grid-layout";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectDetails() {
  const navigate = useNavigate()
  const { id: projectUuid } = useParams<{ id: string }>()
  const { data: project, isLoading } = useProject(projectUuid)

  const initialLayouts = useMemo(() => ({
    lg: [
      { i: "map", x: 0, y: 0, w: 3, h: 20, minW: 3, minH: 3 },
      { i: "optimizationParams", x: 3, y: 0, w: 3, h: 9, minW: 2, minH: 3 },
      { i: "commercialParams", x: 3, y: 9, w: 3, h: 11, minW: 2, minH: 3 },
      { i: "schedule", x: 6, y: 0, w: 6, h: 7, minW: 6, minH: 3 },
      { i: "teams", x: 6, y: 7, w: 6, h: 6, minW: 6, minH: 3 },
      { i: "commercialSummary", x: 6, y: 13, w: 6, h: 7, minW: 6, minH: 3 },
    ],
  }), [])

  const {
    width,
    mounted,
    maximizedPanels,
    currentLayouts,
    containerRef,
    toggleMaximize,
    handleGridLayoutChange,
    isVisible,
  } = useResponsiveGridLayout({
    initialLayouts,
  })

  const handleOptimize = () => {
    console.log("Optimize")
  }

  return (
    <main className="flex h-[calc(100vh-73px)] flex-col overflow-hidden">
      <PageHeader
        showBackButton={true}
        title={isLoading ? ("Loading...") : (
          <span className="group flex items-center gap-2">{project!.name}
          </span>)}
        onBack={() => navigate("/projects")}
      >
        {project && (
          <Button onClick={() => handleOptimize()}>
            Optimize
          </Button>
        )}
      </PageHeader>

      {isLoading && (
        <div className="flex items-center flex-col justify-center h-full">
          <Loader2 className="h-16 w-16 animate-spin" />
          <p className="text-muted-foreground">Loading project details...</p>
        </div>
      )}
      {project && (
        <div ref={containerRef} className="h-full w-full relative overflow-auto">

          {mounted && (
            <Responsive
              className="layout"
              layouts={currentLayouts}
              breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
              cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
              rowHeight={30}
              width={width}
              dragConfig={{ handle: ".widget-drag-handle" }}
              resizeConfig={{ handles: ["e", "se", "s", "sw", "w"], }}
              onLayoutChange={handleGridLayoutChange}

            >
              <div key="optimizationParams" className={`${!isVisible("optimizationParams") ? "hidden" : ""}`}>
                <OptimizationParametersWidget isMaximized={maximizedPanels.includes("optimizationParams")} onMaximizeToggle={() => toggleMaximize("optimizationParams")} />
              </div>
            </Responsive>
          )}
        </div>
      )}
    </main>
  );
}