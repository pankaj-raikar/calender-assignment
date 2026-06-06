const tabs = ["Orders", "Downtime Logs", "Batch Releases"];


export default function TabBar() {
  return (
    <nav className="mt-10 border-b border-blue-400">
        <div className="flex gap-8">
            {tabs.map((tab)=>(
                <button key={tab} className={ tab==="Orders" ? "border-b-4 border-indigo-600 pb-3 text-lg font-mediun text-slate-900 ": "pb-3 text-lg text-slate-400"}>
                    {tab}
                </button>
            ))}
        </div>
        
    </nav>
  )
}

