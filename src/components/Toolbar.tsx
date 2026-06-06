import { useState } from "react";
import { ChevronDown, ListFilter, Plus } from "lucide-react";
import FilterPopover from "./FilterPopover";
import CreateOrderModal from "./CreateOrderModal";

const Toolbar = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    return (

        <div className="mt-10 flex items-center justify-between">
            <div className="relative">
                <button
                    className="flex h-10 items-center gap-3 rounded-md border border-slate-400 bg-slate-100 px-4 text-base text-slate-950"
                    onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
                >
                    <ListFilter size={20} />
                    <span>Filters</span>
                    <ChevronDown size={18} />
                </button>

                {isFilterOpen && <FilterPopover />}
            </div>

            <button onClick={() => setIsCreateOpen(true)} className="flex h-12 items-center gap-3 rounded-md bg-indigo-700 px-6 text-base font-semibold text-white shadow-lg shadow-slate-300">
                <span>Create Order</span>
                <Plus size={20} />
            </button>
            {isCreateOpen && (
                <CreateOrderModal onClose={() => setIsCreateOpen(false)} />
            )}
        </div>


    );
};

export default Toolbar;
