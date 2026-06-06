import CalendarPanel from "./components/CalendarPanel";
import SearchBox from "./components/SearchBox";
import TabBar from "./components/TabBar";
import Toolbar from "./components/Toolbar";
import "./index.css"
import { useEffect } from "react";
import { useOrderStore } from "./store/ordersStore";
import Toast from "./components/Toast";
export default function App() {
  const undo = useOrderStore((state) => state.undo);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isUndo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "z";

      if (isUndo) {
        event.preventDefault();
        undo();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo]);
  return (
    <AppShell>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-semibold tracking-normal text-slate-950 md:font-normal md:text-slate-800">
          Production
        </h1>
        <SearchBox />
      </header>
      <TabBar />
      <Toolbar />
      <CalendarPanel />
      <Toast />
    </AppShell>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      aria-label="Production calendar"
      className="min-h-screen overflow-x-hidden bg-slate-100 px-4 py-6 text-slate-950 md:px-8 md:py-7"
    >
      {children}
    </main>
  );
}
