export type OrderStatus =
  | "Pending"
  | "Completed"
  | "In Progress"
  | "Planned"
  | "Cancelled"
  | "Approved";

export type ProductionOrder = {
  id: string;
  label: string;
  colorCode: string;
  status: OrderStatus;
  startDate: string;
  endDate: string;
  area: string;
  assignee: string;
  progress: number;
};

export const sampleOrders: ProductionOrder[] = [
  {
    id: "1",
    label: "#PO-601",
    colorCode: "F36FCFE1",
    status: "In Progress",
    startDate: "2026-06-01",
    endDate: "2026-06-07",
    area: "Cutting Line",
    assignee: "Maya Chen",
    progress: 75,
  },
  {
    id: "2",
    label: "#PO-602",
    colorCode: "EE844052",
    status: "Completed",
    startDate: "2026-06-01",
    endDate: "2026-06-03",
    area: "Assembly Bay",
    assignee: "Noah Patel",
    progress: 100,
  },
  {
    id: "3",
    label: "#PO-603",
    colorCode: "57AD32B9",
    status: "Approved",
    startDate: "2026-06-03",
    endDate: "2026-06-05",
    area: "Packaging",
    assignee: "Ava Morgan",
    progress: 100,
  },
  {
    id: "4",
    label: "#PO-604",
    colorCode: "BD8A5815",
    status: "In Progress",
    startDate: "2026-06-04",
    endDate: "2026-06-11",
    area: "Finishing Line",
    assignee: "Liam Brooks",
    progress: 45,
  },
  {
    id: "5",
    label: "#PO-605",
    colorCode: "8BFC2E12",
    status: "Pending",
    startDate: "2026-06-06",
    endDate: "2026-06-10",
    area: "Paint Booth",
    assignee: "Sofia Rivera",
    progress: 0,
  },
  {
    id: "6",
    label: "#PO-606",
    colorCode: "1FE576BC",
    status: "Planned",
    startDate: "2026-06-09",
    endDate: "2026-06-13",
    area: "Quality Gate",
    assignee: "Ethan Kim",
    progress: 0,
  },
  {
    id: "7",
    label: "#PO-607",
    colorCode: "D26CC000",
    status: "Planned",
    startDate: "2026-06-10",
    endDate: "2026-06-17",
    area: "Press Line",
    assignee: "Mia Foster",
    progress: 0,
  },
  {
    id: "8",
    label: "#PO-608",
    colorCode: "CFCDD6C5",
    status: "Cancelled",
    startDate: "2026-06-05",
    endDate: "2026-06-08",
    area: "Inspection",
    assignee: "Oliver Stone",
    progress: 10,
  },
  {
    id: "9",
    label: "#PO-609",
    colorCode: "A3F6A261",
    status: "Pending",
    startDate: "2026-06-12",
    endDate: "2026-06-16",
    area: "Dispatch",
    assignee: "Nora Lee",
    progress: 0,
  },
  {
    id: "10",
    label: "#PO-610",
    colorCode: "7BC8F4A2",
    status: "In Progress",
    startDate: "2026-06-06",
    endDate: "2026-06-14",
    area: "Welding Bay",
    assignee: "James Ruiz",
    progress: 60,
  },
  {
    id: "11",
    label: "#PO-611",
    colorCode: "E2A4D761",
    status: "Approved",
    startDate: "2026-06-14",
    endDate: "2026-06-19",
    area: "Assembly Bay",
    assignee: "Priya Sharma",
    progress: 100,
  },
  {
    id: "12",
    label: "#PO-612",
    colorCode: "F9B34C88",
    status: "Planned",
    startDate: "2026-06-16",
    endDate: "2026-06-23",
    area: "Cutting Line",
    assignee: "Carlos Vega",
    progress: 0,
  },
  {
    id: "13",
    label: "#PO-613",
    colorCode: "3DAF9C55",
    status: "In Progress",
    startDate: "2026-06-18",
    endDate: "2026-06-25",
    area: "Paint Booth",
    assignee: "Aisha Okonkwo",
    progress: 30,
  },
  {
    id: "14",
    label: "#PO-614",
    colorCode: "C56BE23F",
    status: "Pending",
    startDate: "2026-06-23",
    endDate: "2026-06-30",
    area: "Finishing Line",
    assignee: "Lucas Wang",
    progress: 0,
  },
];
