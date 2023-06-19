import { cn } from "@/lib/utils";
import data from "./data";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useAtom } from "jotai";
import { collapsed } from "./atom";
import Link from "next/link";

const AdminAside: React.FC = () => {
  const [isCollapsed] = useAtom(collapsed);

  return (
    <Sidebar
      rootStyles={{
        color: "var(--app-foreground)",
      }}
      backgroundColor="var(--app-background)"
      collapsed={isCollapsed}
    >
      <Menu
        menuItemStyles={{
          button: {
            background: "var(--app-background)",
            "&:hover": {
              backgroundColor: "var(--app-background-hover)",
              color: "var(--app-foreground-hover)",
            },
          },
        }}
        key="title"
        renderExpandIcon={({ open }) => {
          return (
            <div className={cn("w-5 h-5 i-tabler-arrow-badge-right transition-all", open ? "rotate-90" : "rotate-0")} />
          );
        }}
      >
        {data.map(({ children, title, link, icon }) => {
          if (children) {
            return (
              <SubMenu label={title} key={title} icon={<div className={cn("w-5 h-5", icon)} />}>
                {children.map((child) => {
                  return (
                    <MenuItem key={child.title} component={<Link href={[link, child.link].join('/')} />} icon={<div className={cn("w-5 h-5", child.icon)} />}>
                      {child.title}
                    </MenuItem>
                  );
                })}
              </SubMenu>
            );
          }
          return (
            <>
              <MenuItem key={title} icon={<div className={cn("w-5 h-5", icon)} />}>
                {title}
              </MenuItem>
            </>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default AdminAside;
