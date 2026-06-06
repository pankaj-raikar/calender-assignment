import type { OrderStatus } from "../data/orders";
import { useOrderStore } from "../store/ordersStore";
const statuses: OrderStatus[] = [
    "Pending",
    "Completed",
    "In Progress",
    "Planned",
    "Cancelled",
    "Approved",
];

export default function FilterPopover() {
    const selectedStatuses = useOrderStore((state) => state.selectedStatuses);
    const toggleStatus = useOrderStore((state) => state.toggleStatus);
    return (
        <div className="absolute left-0 top-12 z-10 w-56 rounded-md border border-slate-200 bg-white p-2 shadow-lg">
            {statuses.map((status) => (
                <label
                    key={status}
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                    <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-300"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => toggleStatus(status)}
                    />
                    <span>{status}</span>
                </label>
            ))}
        </div>
    );
}