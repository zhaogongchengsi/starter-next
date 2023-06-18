import { cn } from "@/lib/utils";
import data from "./data";
import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

const AdminAside: React.FC = () => {
  return (
    <Sidebar
      rootStyles={{
        color: "var(--app-foreground)",
      }}
      backgroundColor="var(--app-background)"
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
		renderExpandIcon={({ open }) => {
			return <div className={cn('w-5 h-5 i-tabler-arrow-badge-right transition-all', open ? 'rotate-90' : 'rotate-0')} />
		}}
      >
        {data.map(({ children, title, link, icon }) => {
          if (children) {
            return (
              <SubMenu label={title} key={title} icon={<div className={cn("w-5 h-h", icon)} />}>
                {children.map((child) => {
                  return <MenuItem key={child.link}> {child.title} </MenuItem>;
                })}
              </SubMenu>
            );
          }
          return (
            <>
              <MenuItem key={link}> {title} </MenuItem>
            </>
          );
        })}
      </Menu>
    </Sidebar>
  );
};

export default AdminAside;
