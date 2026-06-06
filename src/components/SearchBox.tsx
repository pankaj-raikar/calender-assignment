import { useOrderStore } from "../store/ordersStore";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function SearchBox() {
  const searchQuery = useOrderStore((state) => state.searchQuery);
  const setSearchQuery = useOrderStore((state) => state.setSearchQuery);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

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
    <div className="flex items-center justify-end">
      <button
        type="button"
        aria-label="Open search"
        onClick={() => {
          setIsMobileExpanded(true);
          window.setTimeout(() => inputRef.current?.focus(), 0);
        }}
        className={`${isMobileExpanded || searchQuery ? "hidden" : "inline-flex"} h-12 w-12 items-center justify-center rounded-full text-slate-950 md:hidden`}
      >
        <Search size={34} strokeWidth={1.9} />
      </button>

      <div
        className={`${isMobileExpanded || searchQuery ? "flex" : "hidden"} h-12 w-[min(46vw,180px)] items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-slate-400 shadow-sm sm:w-[260px] md:flex md:h-14 md:w-110 md:gap-3 md:px-4`}
      >
        <Search size={20} strokeWidth={1.8} className="shrink-0 md:size-[22px]" />
        <input
          ref={inputRef}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onBlur={() => {
            if (!searchQuery) {
              setIsMobileExpanded(false);
            }
          }}
          placeholder="Search"
          className="min-w-0 flex-1 bg-transparent text-base text-slate-700 outline-none placeholder:text-slate-400 md:text-lg"
        />

        <kbd className="hidden rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 md:inline-flex">
          ⌘ K
        </kbd>
      </div>
    </div>

  )
}
