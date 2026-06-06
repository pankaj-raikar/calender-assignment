import { useState } from "react";
import { ChevronDown, ListFilter, Plus } from "lucide-react";
import FilterPopover from "./FilterPopover";
import CreateOrderModal from "./CreateOrderModal";

const Toolbar = () => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    return (

        <div className="mt-8 flex items-center justify-between gap-3 md:mt-10">
            <div className="relative">
                <button
                    className="flex h-12 items-center gap-3 rounded-md border border-slate-400 bg-white px-4 text-base text-slate-950 md:h-10 md:bg-slate-100"
                    onClick={() => setIsFilterOpen((isOpen) => !isOpen)}
                >
                    <ListFilter size={20} />
                    <span>Filters</span>
                    <ChevronDown size={18} className="hidden md:block" />
                </button>

                {isFilterOpen && <FilterPopover />}
            </div>

            <button onClick={() => setIsCreateOpen(true)} className="flex h-12 items-center gap-3 rounded-md bg-indigo-700 px-4 text-base font-semibold text-white shadow-lg shadow-slate-300 md:px-6">
                <Plus size={20} className="md:order-2" />
                <span>Create Order</span>
            </button>
            {isCreateOpen && (
                <CreateOrderModal onClose={() => setIsCreateOpen(false)} />
            )}
        </div>


    );
};

export default Toolbar;
