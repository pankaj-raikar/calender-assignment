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
        <div onClick={onClick} className={`grid h-16 cursor-pointer grid-cols-[32px_minmax(72px,1fr)_minmax(72px,96px)_52px_22px_48px] items-center gap-1 rounded-lg border bg-white px-3 text-sm shadow-sm md:grid-cols-4 md:gap-0 md:rounded-none md:border-x-0 md:border-t-0 md:px-8 md:text-base md:shadow-none ${isSelected ? "border-indigo-300 bg-indigo-50" : "border-slate-200 md:border-slate-100"
            }`}>
            <div className="contents md:flex md:items-center md:gap-5">
                <span className="font-medium text-slate-500 md:text-indigo-700">#{index}</span>
                <span className="min-w-0 truncate text-sm text-slate-950 min-[390px]:text-base md:text-base">{code}</span>
            </div>

            <div className="justify-self-center">
                <StatusBadge status={status} />
            </div>

            <div className="justify-self-end whitespace-nowrap text-right text-slate-500 md:justify-self-center">{duration}</div>

            <div className="contents md:grid md:w-[112px] md:grid-cols-[28px_4.5ch] md:items-center md:justify-self-center md:gap-4 md:text-slate-500">
                <span className={`block h-5 w-5 shrink-0 justify-self-center rounded-full border-4 md:h-7 md:w-7 md:justify-self-auto ${ringColor}`} />
                <span className="whitespace-nowrap text-right tabular-nums text-slate-500 md:text-inherit">{progress}%</span>
            </div>
        </div>
    );
}

export default OrderRow
