import { Sheet, SheetClose, SheetContent, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";
import { Upload, X } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

interface CSVColumn {
    name: string
    sample: string
}

export function NewProjectDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [projectName, setProjectName] = useState("")
    const [csvFile, setCSVFile] = useState<File | null>(null)
    const [csvColumns, setCSVColumns] = useState<CSVColumn[]>([])
    const [csvRowCount, setCSVRowCount] = useState<number>(0)


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && file.type === "text/csv") {
            setCSVFile(file)
        }
    }
    return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
    </SheetContent>
    </Sheet>
    )
}