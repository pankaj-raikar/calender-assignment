import { X, Trash2 } from "lucide-react";
import { useState } from "react";
import type { OrderStatus, ProductionOrder } from "../data/orders";
import { useOrderStore } from "../store/ordersStore";

type EditOrderModalProps = {
    order: ProductionOrder;
    onClose: () => void;
};

const ALL_STATUSES: OrderStatus[] = [
    "Planned",
    "Pending",
    "In Progress",
    "Approved",
    "Completed",
    "Cancelled",
];

export default function EditOrderModal({ order, onClose }: EditOrderModalProps) {
    const updateOrder = useOrderStore((state) => state.updateOrder);
    const deleteOrder = useOrderStore((state) => state.deleteOrder);

    const [status, setStatus] = useState<OrderStatus>(order.status);
    const [progress, setProgress] = useState(order.progress);
    const [confirmDelete, setConfirmDelete] = useState(false);

    function handleSave() {
        updateOrder(order.id, { status, progress });
        onClose();
    }

    function handleDelete() {
        deleteOrder(order.id);
        onClose();
    }

    // Derive a colour for the progress bar fill
    const progressColour =
        progress === 100
            ? "bg-green-500"
            : progress >= 50
            ? "bg-teal-500"
            : "bg-indigo-500";

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-950/30 px-4">
            <div className="w-full max-w-md rounded-xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-950">
                            Edit Order
                        </h2>
                        <p className="text-sm text-slate-500">
                            {order.label} · {order.area} · {order.assignee}
                        </p>
                    </div>
                    <button
                        aria-label="Close edit order modal"
                        onClick={onClose}
                        className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                    >
                        <X size={22} />
                    </button>
                </div>

                <div className="space-y-5 p-6">
                    {/* Status */}
                    <label className="block">
                        <span className="mb-1 block text-sm font-medium text-slate-700">
                            Status
                        </span>
                        <select
                            value={status}
                            onChange={(e) => {
                                const next = e.target.value as OrderStatus;
                                setStatus(next);
                                // Auto-set progress when jumping to Completed
                                if (next === "Completed") setProgress(100);
                                if (next === "Planned" || next === "Pending") setProgress(0);
                            }}
                            className="h-11 w-full rounded-md border border-slate-300 px-3 text-slate-950 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        >
                            {ALL_STATUSES.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </label>

                    {/* Progress slider */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-700">
                                Progress
                            </span>
                            <span className="text-sm font-semibold tabular-nums text-slate-950">
                                {progress}%
                            </span>
                        </div>

                        {/* Visual bar */}
                        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                            <div
                                className={`h-full rounded-full transition-all duration-150 ${progressColour}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <input
                            id="progress-slider"
                            type="range"
                            min={0}
                            max={100}
                            step={5}
                            value={progress}
                            onChange={(e) => {
                                const val = Number(e.target.value);
                                setProgress(val);
                                // Keep status in sync
                                if (val === 100 && status !== "Cancelled") setStatus("Completed");
                                else if (val > 0 && val < 100 && status === "Planned") setStatus("In Progress");
                            }}
                            className="w-full accent-indigo-600"
                        />
                        <div className="mt-1 flex justify-between text-xs text-slate-400">
                            <span>0%</span>
                            <span>50%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* Delete zone */}
                    {!confirmDelete ? (
                        <button
                            type="button"
                            onClick={() => setConfirmDelete(true)}
                            className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50"
                        >
                            <Trash2 size={16} />
                            Delete this order
                        </button>
                    ) : (
                        <div className="rounded-md border border-red-200 bg-red-50 p-4">
                            <p className="mb-3 text-sm font-medium text-red-700">
                                Are you sure? This cannot be undone (well, Ctrl+Z works 😉).
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setConfirmDelete(false)}
                                    className="flex-1 rounded-md border border-slate-300 py-2 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    className="flex-1 rounded-md bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700"
                                >
                                    Yes, delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-md border border-slate-300 px-4 text-slate-700 hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="h-10 rounded-md bg-indigo-700 px-5 font-semibold text-white hover:bg-indigo-800"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
