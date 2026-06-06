import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useOrderStore } from "../store/ordersStore";

function CalendarHeader() {
    const calendarView = useOrderStore((state) => state.calendarView);
    const setCalendarView = useOrderStore((state) => state.setCalendarView);
    return (
        <div className='flex h-24 items-center justify-between border-b border-slate-200 px-6'>
            <div className='flex items-center gap-8'>
                <h2 className='text-2xl font-semibold text-slate-950'>August 2025</h2>

                <div className='flex items-center gap-5'>
                    <button aria-label='Previous month' className='text-slate-950'>
                        <ChevronLeft size={26} />
                    </button>

                    <button aria-label='Next month' className='text-slate-950'>
                        <ChevronRight size={26} />
                    </button>
                </div>
            </div>

            <div className='flex items-center gap-4'>
                <div className="relative">
                    <select
                        value={calendarView}
                        onChange={(event) =>
                            setCalendarView(event.target.value as "Monthly" | "Weekly")
                        }
                        className="h-11 appearance-none rounded-md border border-slate-300 bg-white px-5 pr-12 text-lg text-slate-950 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
                    >
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>

                    <ChevronDown
                        size={20}
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-700"
                    />
                </div>

                <button className='flex h-11 items-center border gap-8 border-slate-300 bg-white px-5 text-lg text-slate-950 rounded-md'>
                    This Month
                </button>
            </div>
        </div>
    )
}

export default CalendarHeader