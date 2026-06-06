type OrderTagProps = {
    orderNumber: string;
    colorCode: string;
    variant?: "filled" | "outlined" | "green";
};




const OrderTag = ({
    orderNumber,
    colorCode,
    variant = "filled",
}: OrderTagProps) => {
    const styles = {
        filled: "bg-teal-600 text-white border-teal-600",
        outlined: "bg-white text-yellow-500 border-yellow-400",
        green: "bg-green-500 text-white border-green-500",
    };

    return (
        <div
            className={`flex h-9 items-center rounded-md border px-3 text-base font-semibold ${styles[variant]}`}
        >
            <span className="mr-1 rounded-sm bg-white/80 px-1 text-sm font-semibold text-indigo-700">
                {orderNumber}
            </span>
            <span>{colorCode}</span>
        </div>
    );
}

export default OrderTag