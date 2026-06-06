type OrderTagProps = {
    orderNumber: string;
    colorCode: string;
    variant?: "inProgress" | "completed" | "planned" | "cancelled" | "approved";
    tooltip?: string;
    isFaded?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
    isSelected?: boolean;
    orderId: string;
    draggable?: boolean;
    onDragStart?: (orderId: string) => void;
};

const OrderTag = ({
    orderNumber,
    colorCode,
    variant = "inProgress",
    tooltip,
    isFaded,
    onMouseEnter,
    onMouseLeave,
    isSelected,
    orderId,
    draggable = false,
    onDragStart,
}: OrderTagProps) => {
    const styles = {
        inProgress: "border-teal-600 bg-teal-600 text-white",
        completed: "border-green-500 bg-green-500 text-white",
        planned: "border-yellow-400 bg-white text-yellow-500",
        cancelled: "border-slate-400 bg-slate-100 text-slate-500",
        approved: "border-green-600 bg-green-600 text-white",
    };

    return (
        <div
            title={tooltip}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            draggable={draggable}
            onDragStart={() => onDragStart?.(orderId)}
            className={`flex h-5 w-full min-w-0 items-center overflow-hidden rounded border px-1 text-[9px] font-semibold leading-none transition-opacity md:h-9 md:rounded-md md:px-3 md:text-base ${styles[variant]} ${isFaded ? "opacity-30" : "opacity-100"} ${isSelected ? "ring-2 ring-indigo-500 ring-offset-1" : ""}`}
        >
            <span className="mr-0.5 shrink-0 rounded-sm bg-white/80 px-0.5 text-[9px] font-semibold text-indigo-700 md:mr-1 md:px-1 md:text-sm">
                {orderNumber}
            </span>
            <span className="min-w-0 truncate">{colorCode}</span>
        </div>
    );
};

export default OrderTag;
