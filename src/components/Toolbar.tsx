import { ChevronDown, ListFilter, Plus } from "lucide-react";

const Toolbar = () => {
    return (

        <div className="mt-10 flex items-center justify-between">
            <button className="flex h-10 items-center gap-3 rounded-md border border-slate-400 bg-slate-100 px-4 text-base text-slate-950 ">
                <ListFilter size={20} />
                <span>Filters</span>
                <ChevronDown size={18} />
            </button>

            <button className="flex h-12 items-center gap-3 rounded-md bg-indigo-700 px-6 text-base font-semibold text-white shadow-lg shadow-slate-300">
                <span>Create Order</span>
                <Plus size={20} />
            </button>
        </div>
    );
};

export default Toolbar;