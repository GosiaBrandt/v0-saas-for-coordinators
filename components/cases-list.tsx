"use client";

import { CaseListItem } from "./case-list-item";
import type { Case, CaseStatus, Coordinator } from "@/lib/types";
import { getCoordinatorById } from "@/lib/demo-data";

interface CasesListProps {
  cases: Case[];
  coordinators: Coordinator[];
  onStatusChange: (caseId: string, status: CaseStatus) => void;
  onAssignCoordinator: (caseId: string) => void;
}

export function CasesList({
  cases,
  onStatusChange,
  onAssignCoordinator,
}: CasesListProps) {
  if (cases.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p className="text-lg">Brak spraw do wyświetlenia</p>
        <p className="text-sm mt-1">Spróbuj zmienić filtry lub dodaj nową sprawę</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {cases.map((caseItem) => (
        <CaseListItem
          key={caseItem.id}
          caseItem={caseItem}
          coordinator={getCoordinatorById(caseItem.coordinatorId)}
          onStatusChange={onStatusChange}
          onAssignCoordinator={onAssignCoordinator}
        />
      ))}
    </div>
  );
}
