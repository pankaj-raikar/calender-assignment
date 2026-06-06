import { X } from "lucide-react";
import { useMemo, useState } from "react";
import type { OrderStatus, ProductionOrder } from "../data/orders";
import { useOrderStore } from "../store/ordersStore";
import { rangesOverlap } from "../utils/date";

type CreateOrderModalProps = {
    onClose: () => void;
};

function generateUuid8() {
    return Math.random().toString(16).slice(2, 10).toUpperCase();
}


export default function CreateOrderModal({ onClose }: CreateOrderModalProps) {


    const orderId = useMemo(() => generateUuid8(), []);


    const [status, setStatus] = useState<OrderStatus>("Planned");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [error, setError] = useState("");
    const [area, setArea] = useState("Cutting Line");
    const [assignee, setAssignee] = useState("");

    const addOrder = useOrderStore((state) => state.addOrder);
    const orders = useOrderStore((state) => state.orders);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");

        if (!startDate || !endDate) {
            setError("Start date and end date are required.");
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            setError("End date cannot be before start date.");
            return;
        }

        const hasCollision = orders.some(
            (order) =>
                order.area === area &&
                rangesOverlap(startDate, endDate, order.startDate, order.endDate)
        );

        if (hasCollision) {
            setError("This order overlaps another order in the same area.");
            return;
        }
        const newOrder: ProductionOrder = {
            id: orderId,
            label: `#${orderId.slice(0, 2)}`,
            colorCode: orderId,
            status,
            startDate,
            endDate,
            area,
            assignee,
            progress: status === "Completed" ? 100 : 0,
        };

        addOrder(newOrder);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/30">
            <div className="w-full max-w-xl rounded-lg bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <h2 className="text-xl font-semibold text-slate-950">
                        Create Order
                    </h2>

                    <button
                        aria-label="Close create order modal"
                        onClick={onClose}
                        className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 p-6">
                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">
                            Order ID
                        </span>
                        <input
                            value={orderId}
                            readOnly
                            className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">
                            Status
                        </span>
                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value as OrderStatus)}
                            className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950"
                        >
                            <option>Planned</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                            <option>Cancelled</option>
                        </select>
                    </label>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="block">
                            <span className="mb-1 block text-sm font-medium text-slate-700">
                                Start Date
                            </span>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(event) => setStartDate(event.target.value)}
                                className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950"
                            />
                        </label>

                        <label className="block">
                            <span className="mb-1 block text-sm font-medium text-slate-700">
                                End Date
                            </span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(event) => setEndDate(event.target.value)}
                                className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950"
                            />
                        </label>
                    </div>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">
                            Area
                        </span>
                        <select
                            value={area}
                            onChange={(event) => setArea(event.target.value)}
                            className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950"
                        >
                            <option>Cutting Line</option>
                            <option>Assembly Bay</option>
                            <option>Paint Booth</option>
                            <option>Quality Gate</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">
                            Assignee
                        </span>
                        <input
                            list="assignees"
                            value={assignee}
                            onChange={(event) => setAssignee(event.target.value)}
                            className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950"
                        />
                        <datalist id="assignees">
                            <option value="Maya Chen" />
                            <option value="Noah Patel" />
                            <option value="Ava Morgan" />
                            <option value="Liam Brooks" />
                        </datalist>
                    </label>

                    {error && (
                        <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
                            {error}
                        </p>
                    )}

                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="h-10 rounded-md border border-slate-300 px-4 text-slate-700"
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="h-10 rounded-md bg-indigo-700 px-5 font-semibold text-white"
                        >
                            Save Order
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}