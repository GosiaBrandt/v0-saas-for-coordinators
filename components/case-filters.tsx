"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import type { CaseFilters, Coordinator } from "@/lib/types";

interface CaseFiltersComponentProps {
  filters: CaseFilters;
  onFiltersChange: (filters: CaseFilters) => void;
  coordinators: Coordinator[];
}

export function CaseFiltersComponent({
  filters,
  onFiltersChange,
  coordinators,
}: CaseFiltersComponentProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Szukaj sprawy..."
          value={filters.search}
          onChange={(e) =>
            onFiltersChange({ ...filters, search: e.target.value })
          }
          className="pl-9 bg-card"
        />
      </div>

      {/* Status filter */}
      <Select
        value={filters.status}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, status: value as CaseFilters["status"] })
        }
      >
        <SelectTrigger className="w-full sm:w-[160px] bg-card">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie statusy</SelectItem>
          <SelectItem value="nowa">Nowa</SelectItem>
          <SelectItem value="w-trakcie">W trakcie</SelectItem>
          <SelectItem value="oczekuje">Oczekuje</SelectItem>
          <SelectItem value="zamknieta">Zamknięta</SelectItem>
        </SelectContent>
      </Select>

      {/* Priority filter */}
      <Select
        value={filters.priority}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, priority: value as CaseFilters["priority"] })
        }
      >
        <SelectTrigger className="w-full sm:w-[160px] bg-card">
          <SelectValue placeholder="Priorytet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszystkie priorytety</SelectItem>
          <SelectItem value="pilna">Pilna</SelectItem>
          <SelectItem value="wysoka">Wysoka</SelectItem>
          <SelectItem value="standardowa">Standardowa</SelectItem>
        </SelectContent>
      </Select>

      {/* Coordinator filter */}
      <Select
        value={filters.coordinatorId}
        onValueChange={(value) =>
          onFiltersChange({ ...filters, coordinatorId: value })
        }
      >
        <SelectTrigger className="w-full sm:w-[180px] bg-card">
          <SelectValue placeholder="Koordynator" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Wszyscy koordynatorzy</SelectItem>
          <SelectItem value="unassigned">Bez przypisania</SelectItem>
          {coordinators.map((coord) => (
            <SelectItem key={coord.id} value={coord.id}>
              {coord.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
