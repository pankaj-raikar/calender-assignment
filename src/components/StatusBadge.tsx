type Status =
    | "Pending"
    | "Completed"
    | "In Progress"
    | "Planned"
    | "Cancelled"
    | "Approved";

type StatusBadgeProps = {
    status: Status;
};

const statusStyles: Record<Status, string> = {
    Pending: "border border-yellow-400 bg-white text-slate-950",
    Completed: "border border-green-500 bg-green-500 text-white",
    "In Progress": "border border-teal-600 bg-teal-600 text-white",
    Planned: "border border-purple-600 bg-white text-slate-950",
    Cancelled: "border border-red-500 bg-red-500 text-white",
    Approved: "border border-green-600 bg-green-600 text-white",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
    return (
        <span
            className={`inline-flex h-7 min-w-24 items-center justify-center rounded-md px-3 text-xs font-semibold uppercase ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}