"use client"

import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface GeoreferenceDialogProps {
    open: boolean
    maxRows: number
}

export function GeoreferenceDialog({ open }: GeoreferenceDialogProps) {

    return (
        <Dialog open={open} modal={true}>
            <DialogContent
                className="max-w-md space-y-4"
                onInteractOutside={(e) => e.preventDefault()}
                onEscapeKeyDown={(e) => e.preventDefault()}
                showCloseButton={false}
            >
                <DialogHeader>
                    <DialogTitle>Georeference</DialogTitle>
                    <DialogDescription>Wait a minute while we georeference your data</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-center">
                    <Loader2 className="h-20 w-20 animate-spin" />
                </div>
                    <p className="text-sm text-center text-muted-foreground">Georeferencing your data...</p>
            </DialogContent>
        </Dialog>
    )
}


   export default GeoreferenceDialog