import React, { ReactNode } from "react";
import AdminHeader from "./Header";
import { Button } from "@/components/ui/button";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  
  return (
    <section className="w-full h-screen bg-slate-200 dark:bg-black/80 dark:text-#fff">
      <AdminHeader />
      <section>
        <aside><Button>abc</Button></aside>
        <main>{props.children}</main>
      </section>
    </section>
  );
};

export default Layout;
