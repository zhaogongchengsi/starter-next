"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { createContext, useContext } from "react";
import { Menu as SideMenu, MenuItem, SubMenu } from "react-pro-sidebar";

interface AsideMenuContext {
  baseUrl?: string;
}

const MenuContext = createContext<AsideMenuContext | null>(null);

interface AsideMenuProps extends AsideMenuContext {
  Menus: Menu[];
}

interface AsideMenuItemProps {
  menu: Menu;
  parentMenu?: Menu;
}

const AsideMenuItem: React.FC<AsideMenuItemProps> = ({ menu }) => {
  const { children, title, id, icon, path } = menu;

  if (children) {
    return (
      <SubMenu label={title} key={id} icon={<div className={cn("w-5 h-5", icon)} />}>
        {children.map((child) => {
          return <AsideMenuItem key={child.id} menu={child} parentMenu={menu} />;
        })}
      </SubMenu>
    );
  }

  return (
    <MenuItem key={id} component={<Link href={path} />} icon={<div className={cn("w-5 h-5", icon)} />}>
      {title}
    </MenuItem>
  );
};

const AsideMenu: React.FC<AsideMenuProps> = ({ Menus, baseUrl }) => {
  return (
    <SideMenu
      menuItemStyles={{
        button: {
          background: "var(--app-background)",
          "&:hover": {
            backgroundColor: "var(--app-background-hover)",
            color: "var(--app-foreground-hover)",
          },
        },
      }}
      key="id"
      renderExpandIcon={({ open }) => {
        return (
          <div className={cn("w-5 h-5 i-tabler-arrow-badge-right transition-all", open ? "rotate-90" : "rotate-0")} />
        );
      }}
    >
      <MenuContext.Provider value={{ baseUrl: baseUrl }}>
        {Menus.map((menu) => {
          return <AsideMenuItem key={menu.id} menu={menu} />;
        })}
      </MenuContext.Provider>
    </SideMenu>
  );
};

export { AsideMenu, AsideMenuItem };
