import React, { ReactNode } from "react";
import AdminHeader from "./Header";
import AdminAside from "./Aside";
type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {

  return (
    <section className="w-full h-screen flex app-container">
      <AdminAside />
      <section className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="admin-main-box">{props.children}</main>
      </section>
    </section>
  );
};

export default Layout;
