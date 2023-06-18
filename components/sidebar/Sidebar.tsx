import { useState } from "react";
import { SideBarContext } from "./context";
import { cn } from "@/lib/utils";

export interface SideBarProps {
  children: React.ReactNode;
  className?: string;
  width?: number;
  collapseWidth?: number;
  collapse?: boolean;
}

const Sidebar: React.FC<SideBarProps> = ({ children, className, collapse, width = 200, collapseWidth = 60 }) => {
  const [isCollapse, setCollapse] = useState(() => Boolean(collapse));
  const [sideBarWidth, setSideBarWidth] = useState(() => isCollapse ? width : collapseWidth);

  const context = { width, collapseWidth };

  return (
    <>
      <SideBarContext.Provider value={context}>
        <aside style={{ width: `${sideBarWidth}px` }} className={cn(className)}>
          {children}
        </aside>
      </SideBarContext.Provider>
    </>
  );
};

export default Sidebar;
