"use client";
import { signIn } from "next-auth/react"
import Layout from "@/layout/admin";

interface Props {}

const Admin: React.FC<Props> = (props) => {

  return (
    <Layout>
      <div> <button onClick={() => signIn()}>登录</button> </div>
    </Layout>
  );
};

export default Admin;
