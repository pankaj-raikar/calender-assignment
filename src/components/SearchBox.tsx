import { Search } from "lucide-react";


export default function SearchBox() {
  return  (
    <div className="flex h-14 w-110 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-slate-400 shadow-sm">
      <Search size={22} strokeWidth={1.8} />
      <span className="flex-1 text-lg">Search</span>
      <kbd className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
        ⌘ K
      </kbd>
    </div>

  )
}
