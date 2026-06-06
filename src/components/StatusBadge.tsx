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
            className={`inline-flex h-7 min-w-0 w-full items-center justify-center whitespace-nowrap rounded-md px-1.5 text-[9px] font-semibold uppercase min-[390px]:text-[10px] md:w-auto md:min-w-24 md:px-3 md:text-xs ${statusStyles[status]}`}
        >
            {status}
        </span>
    );
}
