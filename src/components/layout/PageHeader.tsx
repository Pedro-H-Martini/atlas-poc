import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
    title: React.ReactNode;
    description?: string;
    children?: React.ReactNode;
    onBack?: () => void;
    showBackButton?: boolean;
}

export function PageHeader({ title, description, children, onBack, showBackButton = false }: PageHeaderProps) {
    return (
        <header className="border-b border-zinc-700 bg-zinc-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center">
      {showBackButton && (
              <Button variant="ghost" size="icon" className="text-zinc-400 mr-2  hover:text-white p-0" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}  
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl font-bold">{title}</h1>
              {description && <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block">{description}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">{children}</div>
        </div>
      </div>
    </header>
  )
}