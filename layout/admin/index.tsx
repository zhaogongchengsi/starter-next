import React, { ReactNode } from "react";
import AdminHeader from "./Header";
import AdminAside from "./Aside";
import Head from "next/head";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <section className="w-full h-screen flex app-container">
      <Head>
        <title>后台管理</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <AdminAside />
      <section className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="admin-main-box">{props.children}</main>
      </section>
    </section>
  );
};

export default Layout;
