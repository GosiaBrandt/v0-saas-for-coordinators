import type { Case, Coordinator } from "./types";

// Demo coordinators
export const coordinators: Coordinator[] = [
  {
    id: "coord-1",
    name: "Anna Kowalska",
    email: "anna.kowalska@example.org",
  },
  {
    id: "coord-2",
    name: "Piotr Nowak",
    email: "piotr.nowak@example.org",
  },
  {
    id: "coord-3",
    name: "Maria Wiśniewska",
    email: "maria.wisniewska@example.org",
  },
  {
    id: "coord-4",
    name: "Tomasz Zieliński",
    email: "tomasz.zielinski@example.org",
  },
];

// Demo cases - realistic data for senior support organization
export const demoCases: Case[] = [
  {
    id: "case-1",
    title: "Wsparcie w codziennych zakupach",
    type: "senior",
    status: "w-trakcie",
    priority: "pilna",
    coordinatorId: "coord-1",
    personName: "Stanisława Majewska",
    personContact: "512 345 678",
    region: "Warszawa - Mokotów",
    description: "Pani Stanisława potrzebuje regularnej pomocy w zakupach spożywczych. Ma trudności z chodzeniem i nie może sama dźwigać ciężkich toreb.",
    operationalNote: "Wolontariusz Marek odwiedza raz w tygodniu, zwykle w piątki.",
    lastContactDate: "2026-04-10",
    nextStepDate: "2026-04-14",
    createdAt: "2026-03-15",
    updatedAt: "2026-04-10",
  },
  {
    id: "case-2",
    title: "Szukamy wolontariusza do rozmów",
    type: "dopasowanie",
    status: "nowa",
    priority: "wysoka",
    coordinatorId: null,
    personName: "Jerzy Adamski",
    personContact: "601 234 567",
    region: "Kraków - Stare Miasto",
    description: "Pan Jerzy jest bardzo samotny po śmierci żony. Potrzebuje kogoś do regularnych rozmów i towarzystwa.",
    operationalNote: "Rodzina prosi o kontakt jak najszybciej.",
    lastContactDate: "2026-04-08",
    nextStepDate: "2026-04-12",
    createdAt: "2026-04-08",
    updatedAt: "2026-04-08",
  },
  {
    id: "case-3",
    title: "Nowy wolontariusz - szkolenie",
    type: "wolontariusz",
    status: "w-trakcie",
    priority: "standardowa",
    coordinatorId: "coord-2",
    personName: "Katarzyna Lewandowska",
    personContact: "698 765 432",
    region: "Poznań",
    description: "Nowa wolontariuszka zgłosiła się przez formularz na stronie. Chce pomagać seniorom w weekendy.",
    operationalNote: "Umówione szkolenie wstępne na 20 kwietnia.",
    lastContactDate: "2026-04-12",
    nextStepDate: "2026-04-20",
    createdAt: "2026-04-05",
    updatedAt: "2026-04-12",
  },
  {
    id: "case-4",
    title: "Pomoc w wizytach lekarskich",
    type: "senior",
    status: "oczekuje",
    priority: "wysoka",
    coordinatorId: "coord-1",
    personName: "Helena Nowicka",
    personContact: "503 111 222",
    region: "Warszawa - Wola",
    description: "Pani Helena ma zaplanowaną operację i będzie potrzebowała wsparcia w wizytach kontrolnych przez najbliższe 2 miesiące.",
    operationalNote: "Czekamy na potwierdzenie terminu operacji ze szpitala.",
    lastContactDate: "2026-04-05",
    nextStepDate: "2026-04-10",
    createdAt: "2026-03-28",
    updatedAt: "2026-04-05",
  },
  {
    id: "case-5",
    title: "Dopasowanie: Zofia i Agnieszka",
    type: "dopasowanie",
    status: "w-trakcie",
    priority: "standardowa",
    coordinatorId: "coord-3",
    personName: "Zofia Kamińska",
    personContact: "517 333 444",
    region: "Gdańsk",
    description: "Dopasowaliśmy panią Zofię z wolontariuszką Agnieszką. Pierwsze spotkanie odbyło się w zeszłym tygodniu.",
    operationalNote: "Obie panie są bardzo zadowolone. Planują wspólne spacery.",
    lastContactDate: "2026-04-11",
    nextStepDate: "2026-04-25",
    createdAt: "2026-03-20",
    updatedAt: "2026-04-11",
  },
  {
    id: "case-6",
    title: "Pilna interwencja - brak kontaktu",
    type: "senior",
    status: "nowa",
    priority: "pilna",
    coordinatorId: "coord-4",
    personName: "Tadeusz Kowalczyk",
    personContact: "606 555 666",
    region: "Łódź",
    description: "Sąsiadka zgłosiła, że pan Tadeusz nie odpowiada na telefon od 3 dni. Mieszka sam i nie ma rodziny w mieście.",
    operationalNote: "PILNE - sprawdzić sytuację jak najszybciej!",
    lastContactDate: "2026-04-07",
    nextStepDate: "2026-04-14",
    createdAt: "2026-04-13",
    updatedAt: "2026-04-13",
  },
  {
    id: "case-7",
    title: "Wolontariusz prosi o przerwę",
    type: "wolontariusz",
    status: "oczekuje",
    priority: "standardowa",
    coordinatorId: "coord-2",
    personName: "Michał Borkowski",
    personContact: "509 888 999",
    region: "Wrocław",
    description: "Pan Michał musi zrobić przerwę w wolontariacie ze względów zdrowotnych. Wróci prawdopodobnie w maju.",
    operationalNote: "Trzeba znaleźć zastępstwo dla jego podopiecznych.",
    lastContactDate: "2026-04-09",
    nextStepDate: "2026-05-01",
    createdAt: "2026-04-09",
    updatedAt: "2026-04-09",
  },
  {
    id: "case-8",
    title: "Świąteczna wizyta - organizacja",
    type: "senior",
    status: "zamknieta",
    priority: "standardowa",
    coordinatorId: "coord-3",
    personName: "Barbara Jankowska",
    personContact: "512 777 888",
    region: "Kraków - Nowa Huta",
    description: "Organizacja wizyty świątecznej u pani Barbary na Wielkanoc. Wolontariusze dostarczyli paczkę i spędzili z nią śniadanie.",
    operationalNote: "Wizyta zakończona sukcesem. Pani Barbara bardzo wdzięczna.",
    lastContactDate: "2026-04-01",
    nextStepDate: null,
    createdAt: "2026-03-10",
    updatedAt: "2026-04-01",
  },
  {
    id: "case-9",
    title: "Pomoc w obsłudze telefonu",
    type: "senior",
    status: "w-trakcie",
    priority: "standardowa",
    coordinatorId: "coord-1",
    personName: "Eugeniusz Pawlak",
    personContact: "508 222 333",
    region: "Warszawa - Ursynów",
    description: "Pan Eugeniusz dostał smartfon od wnuków i potrzebuje pomocy w nauce obsługi. Chciałby nauczyć się robić wideorozmowy.",
    operationalNote: "Wolontariuszka Ewa uczy go krok po kroku. Postępy powolne ale widoczne.",
    lastContactDate: "2026-04-13",
    nextStepDate: "2026-04-18",
    createdAt: "2026-03-25",
    updatedAt: "2026-04-13",
  },
  {
    id: "case-10",
    title: "Nowa seniorka - pierwsze spotkanie",
    type: "senior",
    status: "nowa",
    priority: "wysoka",
    coordinatorId: null,
    personName: "Irena Mazurek",
    personContact: "602 444 555",
    region: "Poznań",
    description: "Pani Irena została zgłoszona przez pracownika socjalnego. Mieszka sama od niedawna po przeprowadzce do domu opieki dziennej.",
    operationalNote: "Potrzebne pierwsze spotkanie poznawcze.",
    lastContactDate: null,
    nextStepDate: "2026-04-16",
    createdAt: "2026-04-12",
    updatedAt: "2026-04-12",
  },
];

// Helper to check if a case is delayed
export function isCaseDelayed(caseItem: Case): boolean {
  if (!caseItem.nextStepDate) return false;
  if (caseItem.status === "zamknieta") return false;
  
  const nextStep = new Date(caseItem.nextStepDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return nextStep < today;
}

// Helper to check if case has no owner
export function hasNoOwner(caseItem: Case): boolean {
  return !caseItem.coordinatorId && caseItem.status !== "zamknieta";
}

// Calculate stats from cases
export function calculateStats(cases: Case[]): { open: number; urgent: number; delayed: number; newThisWeek: number } {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  return {
    open: cases.filter(c => c.status !== "zamknieta").length,
    urgent: cases.filter(c => c.priority === "pilna" && c.status !== "zamknieta").length,
    delayed: cases.filter(c => isCaseDelayed(c)).length,
    newThisWeek: cases.filter(c => new Date(c.createdAt) >= oneWeekAgo).length,
  };
}

// Get coordinator by ID
export function getCoordinatorById(id: string | null): Coordinator | undefined {
  if (!id) return undefined;
  return coordinators.find(c => c.id === id);
}
