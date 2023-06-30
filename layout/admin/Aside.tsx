"use client";

import React from "react";
import { Sidebar } from "react-pro-sidebar";
import { useAtom } from "jotai";
import { collapsed } from "./atom";
import { usePermission } from "@/hooks/logged/use-permission";
import { AsideMenu } from "./Menu";

interface AdminAsideProps {
  baseUrl?: string;
}

const AdminAside: React.FC<AdminAsideProps> = ({ baseUrl }) => {
  const [isCollapsed] = useAtom(collapsed);
  const [pres] = usePermission();

  return (
    <Sidebar
      rootStyles={{
        color: "var(--app-foreground)",
      }}
      backgroundColor="var(--app-background)"
      collapsed={isCollapsed}
    >
      <AsideMenu Menus={pres.menu} baseUrl={baseUrl} />
    </Sidebar>
  );
};

export default AdminAside;
