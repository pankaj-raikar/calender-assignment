import CalendarGrid from "./CalendarGrid"
import CalendarHeader from "./CalendarHeader"
import OrderListPanel from "./OrderListPanel"
import StatusBadge from "./StatusBadge"


const CalenderPanel = () => {
    return (
        <section aria-label="Production calendar workspace"
            className="mt-14 min-h-[680px] border border-slate-200 bg-white">
            <div className="grid min-h-[680px] grid-cols-[1fr_560px]">
                <div>
                    {/* calender will go here*/}
                    <CalendarHeader />
                    <CalendarGrid />
                </div>
                <aside className="border-l border-slate-200">
                    <div className="p-6">
                        <OrderListPanel />
                    </div>
                </aside>
            </div>
        </section>
    )
}

export default CalenderPanel