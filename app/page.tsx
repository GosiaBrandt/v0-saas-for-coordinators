"use client";

import { useState, useMemo } from "react";
import { AppHeader } from "@/components/app-header";
import { KpiCards } from "@/components/kpi-cards";
import { CaseFiltersComponent } from "@/components/case-filters";
import { CasesList } from "@/components/cases-list";
import { NewCaseDialog } from "@/components/new-case-dialog";
import { AssignCoordinatorDialog } from "@/components/assign-coordinator-dialog";
import { demoCases, coordinators, calculateStats, isCaseDelayed } from "@/lib/demo-data";
import type { Case, CaseFilters, CaseStatus, NewCaseData } from "@/lib/types";

export default function CentrumSpraw() {
  const [cases, setCases] = useState<Case[]>(demoCases);
  const [filters, setFilters] = useState<CaseFilters>({
    status: "all",
    priority: "all",
    coordinatorId: "all",
    search: "",
  });
  const [isNewCaseOpen, setIsNewCaseOpen] = useState(false);
  const [assigningCaseId, setAssigningCaseId] = useState<string | null>(null);

  // Calculate stats
  const stats = useMemo(() => calculateStats(cases), [cases]);

  // Filter cases
  const filteredCases = useMemo(() => {
    return cases
      .filter((c) => {
        // Status filter
        if (filters.status !== "all" && c.status !== filters.status) return false;
        
        // Priority filter
        if (filters.priority !== "all" && c.priority !== filters.priority) return false;
        
        // Coordinator filter
        if (filters.coordinatorId === "unassigned" && c.coordinatorId !== null) return false;
        if (filters.coordinatorId !== "all" && filters.coordinatorId !== "unassigned" && c.coordinatorId !== filters.coordinatorId) return false;
        
        // Search filter
        if (filters.search) {
          const search = filters.search.toLowerCase();
          return (
            c.title.toLowerCase().includes(search) ||
            c.personName.toLowerCase().includes(search) ||
            c.region.toLowerCase().includes(search) ||
            c.description.toLowerCase().includes(search)
          );
        }
        
        return true;
      })
      .sort((a, b) => {
        // Sort by: delayed first, then by priority, then by nextStepDate
        const aDelayed = isCaseDelayed(a) ? 0 : 1;
        const bDelayed = isCaseDelayed(b) ? 0 : 1;
        if (aDelayed !== bDelayed) return aDelayed - bDelayed;
        
        const priorityOrder = { pilna: 0, wysoka: 1, standardowa: 2 };
        const aPriority = priorityOrder[a.priority];
        const bPriority = priorityOrder[b.priority];
        if (aPriority !== bPriority) return aPriority - bPriority;
        
        // By next step date
        if (a.nextStepDate && b.nextStepDate) {
          return new Date(a.nextStepDate).getTime() - new Date(b.nextStepDate).getTime();
        }
        
        return 0;
      });
  }, [cases, filters]);

  // Handle status change
  const handleStatusChange = (caseId: string, status: CaseStatus) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, status, updatedAt: new Date().toISOString().split("T")[0] }
          : c
      )
    );
  };

  // Handle coordinator assignment
  const handleAssignCoordinator = (caseId: string, coordinatorId: string) => {
    setCases((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, coordinatorId, updatedAt: new Date().toISOString().split("T")[0] }
          : c
      )
    );
    setAssigningCaseId(null);
  };

  // Handle new case
  const handleNewCase = (data: NewCaseData) => {
    const newCase: Case = {
      id: `case-${Date.now()}`,
      ...data,
      status: "nowa",
      coordinatorId: null,
      operationalNote: "",
      lastContactDate: null,
      nextStepDate: data.nextStepDate || null,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setCases((prev) => [newCase, ...prev]);
    setIsNewCaseOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader onNewCase={() => setIsNewCaseOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Section */}
        <section className="mb-8">
          <KpiCards {...stats} />
        </section>

        {/* Filters Section */}
        <section className="mb-6">
          <CaseFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            coordinators={coordinators}
          />
        </section>

        {/* Results count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Wyświetlanie {filteredCases.length} z {cases.length} spraw
          </p>
        </div>

        {/* Cases List */}
        <section>
          <CasesList
            cases={filteredCases}
            coordinators={coordinators}
            onStatusChange={handleStatusChange}
            onAssignCoordinator={(caseId) => setAssigningCaseId(caseId)}
          />
        </section>
      </main>

      {/* New Case Dialog */}
      <NewCaseDialog
        open={isNewCaseOpen}
        onOpenChange={setIsNewCaseOpen}
        onSubmit={handleNewCase}
      />

      {/* Assign Coordinator Dialog */}
      <AssignCoordinatorDialog
        open={!!assigningCaseId}
        onOpenChange={(open) => !open && setAssigningCaseId(null)}
        coordinators={coordinators}
        onAssign={(coordinatorId) => {
          if (assigningCaseId) {
            handleAssignCoordinator(assigningCaseId, coordinatorId);
          }
        }}
      />
    </div>
  );
}
