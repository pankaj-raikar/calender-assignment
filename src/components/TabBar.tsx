const tabs = ["Orders", "Downtime Logs", "Batch Releases"];


export default function TabBar() {
  return (
    <nav className="mt-7 md:mt-10 md:border-b md:border-blue-400">
        <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm md:flex md:gap-8 md:overflow-visible md:rounded-none md:border-0 md:bg-transparent md:shadow-none">
            {tabs.map((tab)=>(
                <button key={tab} className={ tab==="Orders" ? "min-w-0 border-b-2 border-indigo-600 bg-white px-2 py-3 text-sm font-medium text-indigo-700 shadow-sm md:border-b-4 md:bg-transparent md:px-0 md:pb-3 md:pt-0 md:text-lg md:text-slate-900 md:shadow-none ": "min-w-0 border-l border-slate-200 px-2 py-3 text-sm text-slate-600 first:border-l-0 md:border-l-0 md:px-0 md:pb-3 md:pt-0 md:text-lg md:text-slate-400"}>
                    {tab}
                </button>
            ))}
        </div>
        
    </nav>
  )
}
