import React, { ReactNode } from "react";
import AdminHeader from "./Header";
import { Button } from "@/components/ui/button";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <section className="w-full h-screen flex flex-col app-container">
      <AdminHeader />
      <section className="flex">
        <aside className="row-span-3">
          <Button>abc</Button>
        </aside>
        <main className="row-span-2 col-span-2">{props.children}</main>
      </section>
    </section>
  );
};

export default Layout;
