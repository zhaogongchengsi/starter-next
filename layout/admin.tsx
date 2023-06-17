import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {

  return (
    <section className="w-full h-screen">
      <header>123</header>
      <section>
        <aside>aside</aside>
        <main>{props.children}</main>
      </section>
    </section>
  );
};

export default Layout;
