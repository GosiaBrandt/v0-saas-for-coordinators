"use client";

import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";

interface AppHeaderProps {
  onNewCase: () => void;
}

export function AppHeader({ onNewCase }: AppHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <Heart className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg tracking-tight">Centrum Spraw</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Mali Bracia</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button onClick={onNewCase} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Nowa sprawa</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
