import OrderTag from "./OrderTag";

type CalenderDayCellProps = {
    day: number;
    isCurrentMonth?: boolean
}


const CalendarDayCell = ({
    day,
    isCurrentMonth = true,
}: CalenderDayCellProps) => {
    return (
        <div className="min-h-[168px] border-r border-b border-slate-200 p-1.5">
            <span className={
                isCurrentMonth ? "text-lg font-medium text-slate-950" : "text-lg font-medium text-slate-400"
            }>
                {day}
            </span>
            <div className="mt-2 space-y-1">
                {day === 1 && (
                    <>
                        <OrderTag orderNumber="#3A" colorCode="331BD93A" variant="green" />
                        <OrderTag orderNumber="#4A" colorCode="BD8A5815" />
                    </>
                )}

                {day === 5 && (
                    <OrderTag orderNumber="#1A" colorCode="4FA5743A" variant="outlined" />
                )}
            </div>
        </div>
    )
}

export default CalendarDayCell