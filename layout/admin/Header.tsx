import useMode from "@/hooks/use-mode";
import { useAtom } from "jotai";
import { collapsed } from "./atom";
import { cn } from "@/lib/utils";

const AdminHeader = () => {
  const [mode, setMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useAtom(collapsed);

  const onCollapsedBtn = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className="h-[--admin-header-height] flex justify-between px-3 items-center">
      <button onClick={onCollapsedBtn}>
        <div className={cn("w-5 h-5 i-tabler-arrows-left transition-all", isCollapsed ? "rotate-180" : "rotate-0")} />
      </button>
      <button onClick={() => setMode(!mode)}>
        <div className="w-5 h-5 i-tabler-sun dark:i-tabler-moon" />
      </button>
    </header>
  );
};

export default AdminHeader;
