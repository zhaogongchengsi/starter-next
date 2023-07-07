"use client";
import Layout from "@/layout/admin";

interface Props {
  children: React.ReactNode;
}

const Admin: React.FC<Props> = ({}) => {
  return (
    <Layout baseUrl="admin">
      <div>123</div>
    </Layout>
  );
};

export default Admin;
