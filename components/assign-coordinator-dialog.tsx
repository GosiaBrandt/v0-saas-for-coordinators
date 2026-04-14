"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Coordinator } from "@/lib/types";

interface AssignCoordinatorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  coordinators: Coordinator[];
  onAssign: (coordinatorId: string) => void;
}

export function AssignCoordinatorDialog({
  open,
  onOpenChange,
  coordinators,
  onAssign,
}: AssignCoordinatorDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Przypisz koordynatora</DialogTitle>
          <DialogDescription>
            Wybierz osobę odpowiedzialną za tę sprawę
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-2 py-4">
          {coordinators.map((coordinator) => (
            <Button
              key={coordinator.id}
              variant="outline"
              className="w-full justify-start gap-3 h-auto py-3"
              onClick={() => onAssign(coordinator.id)}
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary shrink-0">
                {coordinator.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="text-left">
                <p className="font-medium">{coordinator.name}</p>
                <p className="text-xs text-muted-foreground">{coordinator.email}</p>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
