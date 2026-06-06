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
        label: "#1",
        colorCode: "F36FCFE1",
        status: "Pending",
        startDate: "2025-07-27",
        endDate: "2025-07-30",
        area: "Cutting Line",
        assignee: "Maya Chen",
        progress: 0,
    },
    {
        id: "2",
        label: "#2",
        colorCode: "EE844052",
        status: "Pending",
        startDate: "2025-08-13",
        endDate: "2025-08-26",
        area: "Assembly Bay",
        assignee: "Noah Patel",
        progress: 0,
    },
    {
        id: "3",
        label: "#3",
        colorCode: "57AD32B9",
        status: "Completed",
        startDate: "2025-08-01",
        endDate: "2025-08-02",
        area: "Packaging",
        assignee: "Ava Morgan",
        progress: 100,
    },
    {
        id: "4",
        label: "#4A",
        colorCode: "BD8A5815",
        status: "In Progress",
        startDate: "2025-07-31",
        endDate: "2025-08-14",
        area: "Finishing Line",
        assignee: "Liam Brooks",
        progress: 100,
    },
    {
        id: "5",
        label: "#5A",
        colorCode: "8BFC2E12",
        status: "In Progress",
        startDate: "2025-07-29",
        endDate: "2025-07-31",
        area: "Paint Booth",
        assignee: "Sofia Rivera",
        progress: 0,
    },
    {
        id: "6",
        label: "#6A",
        colorCode: "1FE576BC",
        status: "Planned",
        startDate: "2025-07-27",
        endDate: "2025-07-27",
        area: "Quality Gate",
        assignee: "Ethan Kim",
        progress: 100,
    },
    {
        id: "7",
        label: "#7A",
        colorCode: "D26CC000",
        status: "In Progress",
        startDate: "2025-07-27",
        endDate: "2025-07-27",
        area: "Press Line",
        assignee: "Mia Foster",
        progress: 100,
    },
    {
        id: "8",
        label: "#8",
        colorCode: "CFCDD6C5",
        status: "Cancelled",
        startDate: "2025-08-01",
        endDate: "2025-08-01",
        area: "Inspection",
        assignee: "Oliver Stone",
        progress: 0,
    },
    {
        id: "9",
        label: "#9",
        colorCode: "A3F6A261",
        status: "Approved",
        startDate: "2025-08-03",
        endDate: "2025-08-03",
        area: "Dispatch",
        assignee: "Nora Lee",
        progress: 0,
    }
];