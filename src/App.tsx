import CalenderPanel from "./components/CalenderPanel";
import SearchBox from "./components/SearchBox";
import TabBar from "./components/TabBar";
import Toolbar from "./components/Toolbar";
import "./index.css"
export default function App() {
  return (
    <AppShell>
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-normal tracking-normal text-slate-800
        ">
          Production
        </h1>
        <SearchBox />
      </header>
      <TabBar />
      <Toolbar />
      <CalenderPanel />
    </AppShell>
  );
}

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <main
      aria-label="Production calendar"
      className="min-h-screen bg-slate-100 px-8 py-7 text-slate-950"
    >
      {children}
    </main>
  );
}
