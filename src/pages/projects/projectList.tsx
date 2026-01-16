import { PageHeader } from "@/components/layout/PageHeader"
import { NewProjectDialog } from "@/components/projects/NewProjectDialog"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"
import { useState } from "react"

export default function ProjectList() {
    const [open, setOpen] = useState(false)
    return (
    <main className="flex min-h-[calc(100vh-73px)] flex-col">
    <NewProjectDialog open={open} onOpenChange={setOpen} />
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


    </main>

    )
}