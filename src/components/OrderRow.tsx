import StatusBadge from "./StatusBadge";

type OrderRowProps = {
    index: number;
    code: string;
    status: "Pending" | "Completed" | "In Progress" | "Planned" | "Cancelled" | "Approved";
    duration: string;
    progress: number;
    orderId: string;
    isSelected?: boolean;
    onClick?: () => void;
};


const OrderRow = ({
    index,
    code,
    status,
    duration,
    progress,
    orderId,
    isSelected,
    onClick
}: OrderRowProps) => {
    const ringColor =
        progress === 100 ? "border-green-500" : "border-slate-200";

    return (
        <div onClick={onClick} className={`grid h-16 cursor-pointer grid-cols-4 items-center border-b px-8 text-base ${isSelected ? "border-indigo-300 bg-indigo-50" : "border-slate-100"
            }`}>
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
