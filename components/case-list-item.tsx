"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  User,
  Heart,
  Users,
  Calendar,
  ArrowRight,
  MoreHorizontal,
  AlertCircle,
  UserX,
} from "lucide-react";
import Link from "next/link";
import type { Case, CaseStatus, Coordinator } from "@/lib/types";
import { STATUS_CONFIG, PRIORITY_CONFIG } from "@/lib/types";
import { isCaseDelayed, hasNoOwner } from "@/lib/demo-data";

interface CaseListItemProps {
  caseItem: Case;
  coordinator?: Coordinator;
  onStatusChange: (caseId: string, status: CaseStatus) => void;
  onAssignCoordinator: (caseId: string) => void;
}

const typeIcons = {
  senior: User,
  wolontariusz: Heart,
  dopasowanie: Users,
};

const typeLabels = {
  senior: "Senior",
  wolontariusz: "Wolontariusz",
  dopasowanie: "Dopasowanie",
};

function formatDate(dateStr: string | null): string {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  return date.toLocaleDateString("pl-PL", {
    day: "numeric",
    month: "short",
  });
}

export function CaseListItem({
  caseItem,
  coordinator,
  onStatusChange,
  onAssignCoordinator,
}: CaseListItemProps) {
  const TypeIcon = typeIcons[caseItem.type];
  const isDelayed = isCaseDelayed(caseItem);
  const noOwner = hasNoOwner(caseItem);
  const statusConfig = STATUS_CONFIG[caseItem.status];
  const priorityConfig = PRIORITY_CONFIG[caseItem.priority];

  return (
    <Card className={`group transition-all hover:shadow-md border-border/50 ${isDelayed ? "border-l-4 border-l-destructive" : ""}`}>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Main info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-muted shrink-0">
                <TypeIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    href={`/sprawy/${caseItem.id}`}
                    className="font-medium hover:text-primary transition-colors truncate"
                  >
                    {caseItem.title}
                  </Link>
                  {isDelayed && (
                    <Badge variant="destructive" className="shrink-0 gap-1 text-xs">
                      <AlertCircle className="h-3 w-3" />
                      Opóźniona
                    </Badge>
                  )}
                  {noOwner && (
                    <Badge variant="outline" className="shrink-0 gap-1 text-xs border-warning text-warning-foreground">
                      <UserX className="h-3 w-3" />
                      Brak właściciela
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span>{typeLabels[caseItem.type]}</span>
                  <span>•</span>
                  <span>{caseItem.personName}</span>
                  <span>•</span>
                  <span>{caseItem.region}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap lg:flex-nowrap">
            <Badge variant="outline" className={`${statusConfig.color} shrink-0`}>
              {statusConfig.label}
            </Badge>
            <Badge variant="outline" className={`${priorityConfig.color} shrink-0`}>
              {priorityConfig.label}
            </Badge>
          </div>

          {/* Dates */}
          <div className="flex items-center gap-4 text-sm shrink-0">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ostatni:</span>
              <span>{formatDate(caseItem.lastContactDate)}</span>
            </div>
            <div className={`flex items-center gap-1.5 ${isDelayed ? "text-destructive font-medium" : "text-muted-foreground"}`}>
              <ArrowRight className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Następny:</span>
              <span>{formatDate(caseItem.nextStepDate)}</span>
            </div>
          </div>

          {/* Coordinator */}
          <div className="flex items-center gap-2 shrink-0 min-w-[140px]">
            {coordinator ? (
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                  {coordinator.name.split(" ").map(n => n[0]).join("")}
                </div>
                <span className="text-sm truncate">{coordinator.name.split(" ")[0]}</span>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
                onClick={() => onAssignCoordinator(caseItem.id)}
              >
                <UserX className="h-4 w-4 mr-1" />
                Przypisz
              </Button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onStatusChange(caseItem.id, "nowa")}>
                  Oznacz jako nowa
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(caseItem.id, "w-trakcie")}>
                  Oznacz jako w trakcie
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(caseItem.id, "oczekuje")}>
                  Oznacz jako oczekuje
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onStatusChange(caseItem.id, "zamknieta")}>
                  Zamknij sprawę
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/sprawy/${caseItem.id}`}>
                Szczegóły
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
