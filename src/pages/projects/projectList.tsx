import { PageHeader } from "@/components/layout/PageHeader"
import { NewProjectDialog } from "@/components/projects/NewProjectDialog"
import { Button } from "@/components/ui/button"
import { ChevronRight, Loader2, Plus, Upload } from "lucide-react"
import { useState } from "react"
import { useProjectsSummary } from "@/hooks/useProjects"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
export default function ProjectList() {
    const [open, setOpen] = useState(false)
    const { data: projects = [], isLoading } = useProjectsSummary()
    const navigate = useNavigate()
    return (
        <main className="flex min-h-[calc(100vh-73px)] flex-col">
            <PageHeader title="Projects" description="Track and manage your projects">
                <Button onClick={() => setOpen(true)}>
                    <Plus className="h-4 w-4" />
                    Add Project
                </Button>
            </PageHeader>
            {isLoading && (
                <div className="flex flex-col items-center justify-center flex-1">
                    <Loader2 className="h-30 w-30 animate-spin" />
                    <p className="text-muted-foreground text-xl">Loading projects...</p>
                </div>
            )}
            {projects.length === 0 && !isLoading && (
                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                    <div className="rounded-full bg-zinc-100 dark:bg-zinc-800 p-4">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">Import a project</h2>
                        <p className="text-muted-foreground">Import a project from a CSV file to get started</p>
                    </div>
                    <Button onClick={() => setOpen(true)} size="lg" className="mt-2">
                        <Upload className="h-4 w-4" />
                        Upload CSV File
                    </Button>
                </div>
            )}
            {projects.length > 0 && (

                <div className="p-4 md:p-6 lg:p-8">
                    <div className="mx-auto max-w-4xl space-y-3">
                        {projects.map((project) => (
                            <Card
                                key={project.uuid}
                                onClick={() => navigate(`/projects/${project.uuid}`)}
                                className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-600"
                            >
                                <CardContent className="p-4 md:p-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col gap-3">
                                            <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                                                {project.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium">
                                                    {project.totalSites} sites
                                                </span>
                                                <span className="inline-flex items-center bg-zinc-100 dark:bg-zinc-800 px-3 py-1 text-xs font-medium">
                                                    {project.totalWorkItems} work items
                                                </span>
                                            </div>
                                        </div>
                                        <ChevronRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}
            <NewProjectDialog open={open} onOpenChange={setOpen} />
        </main>
    )
}

