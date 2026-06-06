import { useEffect } from "react";
import { useOrderStore } from "../store/ordersStore";

export default function Toast() {
    const toastMessage = useOrderStore((state) => state.toastMessage);
    const clearToastMessage = useOrderStore((state) => state.clearToastMessage);

    useEffect(() => {
        if (!toastMessage) {
            return;
        }

        const timeoutId = window.setTimeout(() => {
            clearToastMessage();
        }, 4500);

        return () => window.clearTimeout(timeoutId);
    }, [toastMessage, clearToastMessage]);

    if (!toastMessage) {
        return null;
    }

    return (
        <div className="fixed top-6 right-6 z-30 rounded-md bg-slate-950 px-4 py-3 text-sm font-medium text-white shadow-lg">
            {toastMessage}
        </div>
    );
}