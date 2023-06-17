import React, { ReactNode } from "react";
import { useSession, signIn } from "next-auth/react";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="w-full justify-center flex items-center h-screen">
        <h3 className="text-10 text-black">loading</h3>
      </div>
    );
  }

  if (status === "unauthenticated") {
    signIn();
  }

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
