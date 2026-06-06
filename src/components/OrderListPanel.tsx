import { Info } from "lucide-react"


const OrderListPanel = () => {
    return (
        <div className="h-full">
            <div className="grid h-16 grid-cols-[1.4fr_1fr_0.9fr_0.9fr] items-center border-b border-slate-200 px-6 text-lg font-semibold text-slate-950">
                <div className="flex items-center gap-2">
                    <span>Plan/Order</span>
                    <Info size={18} className="text-slate-500" />
                </div>

                <div>Status</div>
                <div>Duration</div>
                <div className="text-right">Progress</div>
            </div>

            <div>
                {/* OrderRow components will go here next */}
            </div>
        </div>
    )
}

export default OrderListPanel