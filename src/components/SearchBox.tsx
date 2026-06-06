import { useOrderStore } from "../store/ordersStore";
import { Search } from "lucide-react";
import { useEffect, useRef } from "react";

export default function SearchBox() {
  const searchQuery = useOrderStore((state) => state.searchQuery);
  const setSearchQuery = useOrderStore((state) => state.setSearchQuery);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isSearchShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";

      if (isSearchShortcut) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);


  return (
    <div className="flex h-14 w-110 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 text-slate-400 shadow-sm">
      <Search size={22} strokeWidth={1.8} />
      <input
        ref={inputRef}
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search"
        className="min-w-0 flex-1 bg-transparent text-lg text-slate-700 outline-none placeholder:text-slate-400"
      />

      <kbd className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
        ⌘ K
      </kbd>
    </div>

  )
}
