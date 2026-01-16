import React from "react";

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
    return (
        <header className="border-b border-zinc-700 bg-zinc-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center">
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