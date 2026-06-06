import StatusBadge from "./StatusBadge";

type OrderRowProps = {
    index: number;
    code: string;
    status: "Pending" | "Completed" | "In Progress" | "Planned" | "Cancelled" | "Approved";
    duration: string;
    progress: number;
};


const OrderRow = ({
    index,
    code,
    status,
    duration,
    progress,
}: OrderRowProps) => {
    const ringColor =
        progress === 100 ? "border-green-500" : "border-slate-200";

    return (
        <div className="grid h-16 grid-cols-4 items-center border-b border-slate-100 px-8 text-base">
            <div className="flex items-center gap-5">
                <span className="font-medium text-indigo-700">#{index}</span>
                <span className="text-slate-950">{code}</span>
            </div>

            <div className="justify-self-center">
                <StatusBadge status={status} />
            </div>

            <div className="justify-self-center text-slate-500">{duration}</div>

            <div className="flex items-center justify-center gap-3 text-slate-500">
                <span>{progress}</span>
                <span className={`h-7 w-7 rounded-full border-4 ${ringColor}`} />
            </div>
        </div>
    );
}

export default OrderRow
