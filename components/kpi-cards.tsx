"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen, AlertTriangle, Clock, Sparkles } from "lucide-react";

interface KpiCardsProps {
  open: number;
  urgent: number;
  delayed: number;
  newThisWeek: number;
}

const kpiConfig = [
  {
    key: "open",
    label: "Otwarte sprawy",
    icon: FolderOpen,
    colorClass: "text-primary",
    bgClass: "bg-primary/10",
  },
  {
    key: "urgent",
    label: "Pilne",
    icon: AlertTriangle,
    colorClass: "text-destructive",
    bgClass: "bg-destructive/10",
  },
  {
    key: "delayed",
    label: "Opóźnione",
    icon: Clock,
    colorClass: "text-warning-foreground",
    bgClass: "bg-warning/30",
  },
  {
    key: "newThisWeek",
    label: "Nowe w tym tygodniu",
    icon: Sparkles,
    colorClass: "text-info-foreground",
    bgClass: "bg-info/20",
  },
] as const;

export function KpiCards({ open, urgent, delayed, newThisWeek }: KpiCardsProps) {
  const values = { open, urgent, delayed, newThisWeek };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiConfig.map((kpi) => {
        const Icon = kpi.icon;
        const value = values[kpi.key];
        
        return (
          <Card key={kpi.key} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${kpi.bgClass}`}>
                <Icon className={`h-5 w-5 ${kpi.colorClass}`} />
              </div>
              <div>
                <p className="text-2xl font-semibold tracking-tight">{value}</p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
