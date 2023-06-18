import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/siderbar";
import data, { NavBarOptions } from "./data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const AsideItem: React.FC<NavBarOptions & { indent?: number }> = (props) => {
  const { link, icon, title, children, indent } = props;
  const headerClassName = "w-full flex items-center py-4";
  const titleClassName = "w-25 text-left ml-2 text-sm";

  if (!children) {
    return (
      <Link
        href={link || "/"}
        className={cn("app-sider-border-t", headerClassName)}
        style={{ paddingLeft: `${indent}px` }}
      >
        {icon && <div className={cn("w-5 h-5", icon)} />}
        <span className={titleClassName}>{title}</span>
      </Link>
    );
  }

  return (
    <AccordionItem value={title}>
      <AccordionTrigger className="pr-3">
        <div className={cn(headerClassName)} style={{ paddingLeft: `${indent}px` }}>
          {icon && <div className={cn("w-5 h-5", icon)} />}
          <span className={titleClassName}>{title}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {children.map((child) => {
          return <AsideItem {...child} indent={indent + 20} />;
        })}
      </AccordionContent>
    </AccordionItem>
  );
};

const AdminAside: React.FC = () => {
  return (
    <Accordion type="single" collapsible className="w-50">
      {data.map((item) => {
        return <AsideItem {...item} indent={10} />;
      })}
    </Accordion>
  );
};

export default AdminAside;
