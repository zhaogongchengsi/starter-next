import { useAtom } from "jotai";
import { collapsed } from "./atom";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ModeToggle";

const AdminHeader = () => {
  const [isCollapsed, setIsCollapsed] = useAtom(collapsed);

  const onCollapsedBtn = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <header className="h-[--admin-header-height] flex justify-between px-3 items-center">
      <button onClick={onCollapsedBtn}>
        <div className={cn("w-5 h-5 i-tabler-arrows-left transition-all", isCollapsed ? "rotate-180" : "rotate-0")} />
      </button>
      <ModeToggle />
    </header>
  );
};

export default AdminHeader;
