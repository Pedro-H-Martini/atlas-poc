import { PageHeader } from "@/components/layout/PageHeader"
import { NewProjectDialog } from "@/components/projects/NewProjectDialog"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Upload } from "lucide-react"
import { useState } from "react"
import { useProjectsSummary } from "@/hooks/useProjects"
import { Card, CardContent } from "@/components/ui/card"

export default function ProjectList() {
    const [open, setOpen] = useState(false)
    const { data: projects = [], isLoading } = useProjectsSummary()
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
    {projects.length === 0 && (
        <>

    <PageHeader title="Projects" description="Track and manage your projects" >
        <Button onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Project
        </Button>
    </PageHeader>

    <div className="flex flex-1 flex-col items-center justify-center">
        <h1>Import a project</h1>
        <p className="text-muted-foreground">Import a project from a CSV file</p>
        <Button onClick={() => setOpen(true)}>
            <Upload className="h-4 w-4" />
            Upload CSV File
        </Button>
    </div>
</>
    )}
    {projects.length > 0 && (
        <Card>
            <CardContent>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {projects.map((project) => (
                        <div className="flex flex-col gap-1 py-3" key={project.uuid}>
                            <p className="text-2xl font-bold">{project.name}</p>
                            <div className="flex flex-row gap-4 text-muted-foreground">
                                <p>Sites: {project.totalSites}</p>
                                <p>Work items: {project.totalWorkItems}</p>
                                <p>Voided work items: {project.totalVoidedWorkItems}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )}
    <NewProjectDialog open={open} onOpenChange={setOpen} />
    </main>
    )
}