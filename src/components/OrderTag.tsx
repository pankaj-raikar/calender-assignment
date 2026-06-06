type OrderTagProps = {
    orderNumber: string;
    colorCode: string;
    variant?: "inProgress" | "completed" | "planned" | "cancelled" | "approved";
    tooltip?: string;
    isFaded?: boolean;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

const OrderTag = ({
    orderNumber,
    colorCode,
    variant = "inProgress",
    tooltip,
    isFaded,
    onMouseEnter,
    onMouseLeave,
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
            className={`flex h-9 items-center rounded-md border px-3 text-base font-semibold transition-opacity ${styles[variant]} ${isFaded ? "opacity-30" : "opacity-100"}`}
        >
            <span className="mr-1 rounded-sm bg-white/80 px-1 text-sm font-semibold text-indigo-700">
                {orderNumber}
            </span>
            <span>{colorCode}</span>
        </div>
    );
};

export default OrderTag;
