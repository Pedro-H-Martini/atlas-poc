import { PageHeader } from "@/components/layout/PageHeader"
import { Button } from "@/components/ui/button"
import { Plus, Upload } from "lucide-react"

export default function ProjectList() {
    return (
    <main className="flex min-h-[calc(100vh-73px)] flex-col">

    <PageHeader title="Projects" description="Track and manage your projects" >
        <Button>
            <Plus className="h-4 w-4" />
            Add Project
        </Button>
    </PageHeader>

    <div className="flex flex-col items-center justify-center">
        <h1>Import a project</h1>
        <p className="text-muted-foreground">Import a project from a CSV file</p>
        <Button>
            <Upload className="h-4 w-4" />
            Upload CSV File
        </Button>
    </div>
    </main>

    )
}