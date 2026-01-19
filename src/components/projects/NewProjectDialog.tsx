import { Sheet, SheetClose, SheetContent, SheetFooter, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { ArrowRight, Check, Upload, X } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { GeoreferenceDialog } from "./GeoreferenceDialog";
import { useNavigate } from "react-router-dom";
import { useCreateProject } from "@/hooks/useProjects";
import { toast, Toaster } from "sonner";


type Step = "basic" | "mapping"
interface CSVColumn {
    name: string
    sample: string
}

interface ColumnMapping {
    code?: string
    address?: string
    city?: string
    state?: string
    workItems?: string
}

export function NewProjectDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [projectName, setProjectName] = useState("")
    const [csvFile, setCSVFile] = useState<File | null>(null)
    const [csvColumns, setCSVColumns] = useState<CSVColumn[]>([])
    const [csvRowCount, setCSVRowCount] = useState<number>(0)
    const [step,setStep] = useState<Step>("basic")
    const [mapping, setMapping] = useState<ColumnMapping>({})
    const [isGeoreferencing, setIsGeoreferencing] = useState(false)
    const navigate = useNavigate()
    const createProject = useCreateProject()


    const handleNext = () => {
        if (!projectName.trim()) {
            toast.error("Please enter a project name")
            return
        }
        if (!csvFile) {
            toast.error("Please upload a CSV file")
            return
        }
        setStep("mapping")
    }
    const handleBack = () => {
        setStep("basic")
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
            toast.error("Please upload a valid CSV file")
            return
        }
        setCSVFile(file)
        parseCSV(file)
    }
    const handleMappingChange = (csvColumn: string, target: keyof ColumnMapping | "discard") => {
        setMapping((prev) => {
            const newMapping: ColumnMapping = { ...prev }
            
            // Remove this column from any existing mapping
            const keys = Object.keys(newMapping) as Array<keyof ColumnMapping>
            keys.forEach((key) => {
                if (newMapping[key] === csvColumn) {
                    delete newMapping[key]
                }
            })
            
            // If not discarding, set the new mapping
            if (target !== "discard") {
                newMapping[target] = csvColumn
            }
            
            return newMapping
        })
    }
    const handleSubmit = async () => {
        if (!csvFile) {
            toast.error("CSV file is missing")
            return
        }
        
        const missingMappings = []
        if (!mapping.code) missingMappings.push("Code")
        if (!mapping.address) missingMappings.push("Address")
        if (!mapping.city) missingMappings.push("City")
        if (!mapping.state) missingMappings.push("State")
        if (!mapping.workItems) missingMappings.push("Total Work Items")
        
        if (missingMappings.length > 0) {
            toast.error(`Missing required mappings: ${missingMappings.join(", ")}`)
            return
        }

        const mappedData = {
            name: projectName,
            mapping:{
                code: mapping.code!,
                address: mapping.address!,
                city: mapping.city!,
                state: mapping.state!,
                workItems: mapping.workItems!
            },
            csvFile: csvFile
        }
        setIsGeoreferencing(true)

        try {
            const project = await createProject.mutateAsync(mappedData)
            setIsGeoreferencing(false)
            setStep("basic")
            setProjectName("")
            setCSVFile(null)
            setCSVColumns([])
            setCSVRowCount(0)
            setMapping({})
            onOpenChange(false)
            navigate(`/projects/${project.uuid}`)
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to create project"
            toast.error(errorMessage)
            console.error("Failed to create project:", error)
            setIsGeoreferencing(false)
        }
    }


const getMappingStatus = (csvColumn: string): string => {
    if (mapping.code === csvColumn) return "code"
    if (mapping.address === csvColumn) return "address"
    if (mapping.city === csvColumn) return "city"
    if (mapping.state === csvColumn) return "state"
    if (mapping.workItems === csvColumn) return "workItems"
    return "discard"
}


const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split("\n").filter(line => line.trim() !== "")
      if (lines.length > 0) {
        const headers = lines[0].split(",").map((h) => h.trim())
        const firstDataRow = lines[1]?.split(",").map((d) => d.trim()) || []

        // Calculate row count (excluding header)
        const rowCount = Math.max(0, lines.length - 1)
        setCSVRowCount(rowCount)

        const columns: CSVColumn[] = headers.map((header, index) => ({
          name: header,
          sample: firstDataRow[index] || "N/A",
        }))

        setCSVColumns(columns)

        // Auto-match columns (case-insensitive)
        const newMapping: ColumnMapping = {}
        const requiredFields = ["code", "address", "city", "state"]

        headers.forEach((header) => {
          const lowerHeader = header.toLowerCase()
          const matchedField = requiredFields.find((field) => field.toLowerCase() === lowerHeader)
          if (matchedField) {
            newMapping[matchedField as keyof Omit<ColumnMapping, "workItems">] = header
          }
        })

        // Auto-match workItems: find the last column containing "total" (case-insensitive)
        let lastTotalColumn: string | null = null
        headers.forEach((header) => {
          if (header.toLowerCase().includes("total")) {
            lastTotalColumn = header
          }
        })
        if (lastTotalColumn) {
          newMapping.workItems = lastTotalColumn
        }

        setMapping(newMapping)
      }
    }
    reader.readAsText(file)
  }

    const canSubmit = mapping.code && mapping.address && mapping.city && mapping.state && mapping.workItems
    
    return (
    <Sheet open={open} onOpenChange={onOpenChange} 
    >
      <Toaster position="top-center" />
      {step === "basic" && (
        <SheetContent
        side="bottom"
        className="w-full h-[80vh] p-0 flex flex-col data-[state=closed]:duration-150 data-[state=open]:duration-250"
        overlayClassName="data-[state=closed]:duration-150 data-[state=open]:duration-250"
        showClose={false}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        <div className="relative flex items-center justify-center mt-4 px-4">
          <SheetTitle className="text-2xl font-bold">Import a project</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" className="absolute right-4 p-1 hover:bg-gray-100 rounded-md transition-colors">
              <X className="h-5 w-5 " />
            </Button>
          </SheetClose>
        </div>
        
        <Input className="mx-auto w-full max-w-md"
          id="name"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <div className="flex items-center gap-3 text-center mx-auto w-full max-w-md">
          <Input id="csv" type="file" accept=".csv" onChange={handleFileChange} className="hidden" />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("csv")?.click()}
            className="w-full justify-start gap-2"
          >
            <Upload className="h-4 w-4" />
            {csvFile ? csvFile.name : "Upload CSV File"}
          </Button>
        </div>

        <Button className="mx-auto w-full max-w-md" type="button" onClick={handleNext}>
          Map Columns
          <ArrowRight className="h-4 w-4" />
        </Button>
      </SheetContent>
      )}
      {step === "mapping" && (
        <SheetContent
        side="bottom"
        className="w-full h-[80vh] p-0 flex flex-col data-[state=closed]:duration-150 data-[state=open]:duration-250"
        overlayClassName="data-[state=closed]:duration-150 data-[state=open]:duration-250"
        showClose={false}
        onEscapeKeyDown={(event) => {
          event.preventDefault();
        }}
      >
        <div className="relative flex items-center justify-center mt-4 px-4">
          <SheetTitle className="text-2xl font-bold">Map Columns</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" onClick={handleBack} className="absolute right-4 p-1 hover:bg-gray-100 rounded-md transition-colors">
              <X className="h-5 w-5 " />
            </Button>
          </SheetClose>
        </div>
    
        <div className="flex-1 overflow-y-auto py-4">
          <div className="space-y-3 w-full max-w-2xl mx-auto pb-6">
            {csvColumns.map((column) => (
              <div
                key={column.name}
                className={`flex items-center gap-3 p-4 border rounded-lg bg-card transition-opacity ${getMappingStatus(column.name) === "discard" ? "opacity-40" : "opacity-100"
                  }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{column.name}</div>
                  <div className="text-sm text-muted-foreground truncate">Sample: {column.sample}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                <Select
                  value={getMappingStatus(column.name)}
                  onValueChange={(value) => handleMappingChange(column.name, value as keyof ColumnMapping | "discard")}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="code">Code</SelectItem>
                    <SelectItem value="address">Address</SelectItem>
                    <SelectItem value="city">City</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="workItems">Total Work Items</SelectItem>
                    <SelectItem value="discard">Discard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          </div>
          <SheetFooter className="sticky bottom-0 z-10 bg-white dark:bg-zinc-950 border-t px-6 py-4 gap-2">
            <div className={cn('flex items-start gap-2 p-4 border rounded-lg w-full max-w-2xl mx-auto',
              canSubmit ? 'bg-green-900/20  border-green-900/5' : 'bg-primary/5 border-primary/20')}>
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Required Mappings</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={mapping.code ? "default" : "secondary"}>Code {mapping.code && "✓"}</Badge>
                  <Badge variant={mapping.address ? "default" : "secondary"}>Address {mapping.address && "✓"}</Badge>
                  <Badge variant={mapping.city ? "default" : "secondary"}>City {mapping.city && "✓"}</Badge>
                  <Badge variant={mapping.state ? "default" : "secondary"}>State {mapping.state && "✓"}</Badge>
                  <Badge variant={mapping.workItems ? "default" : "secondary"}>
                    Total Work Items {mapping.workItems && "✓"}
                  </Badge>
                </div>
              </div>
            </div>
            <Button type="button" className="w-full max-w-2xl mx-auto" onClick={() => handleSubmit()}>
              Create Project
            </Button>
          </SheetFooter>

      </SheetContent>
      )}
      <GeoreferenceDialog open={isGeoreferencing} maxRows={csvRowCount} />
    </Sheet>
    )
}

export default NewProjectDialog