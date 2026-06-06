import CalendarGrid from "./CalendarGrid"
import CalendarHeader from "./CalendarHeader"
import OrderListPanel from "./OrderListPanel"


const CalendarPanel = () => {
    return (
        <section aria-label="Production calendar workspace"
            className="mt-6 min-h-[680px] bg-white md:mt-14 md:border md:border-slate-200">
            <div className="grid min-h-[680px] grid-cols-1 md:grid-cols-[1fr_560px]">
                <div className="min-w-0">
                    <CalendarHeader />
                    <CalendarGrid />
                </div>
                <aside className="min-w-0 bg-slate-50 md:border-l md:border-slate-200 md:bg-white">
                    <OrderListPanel />
                </aside>
            </div>
        </section>
    )
}

export default CalendarPanel
