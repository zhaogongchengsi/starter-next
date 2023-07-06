"use client";
import Layout from "@/layout/admin";

interface Props {}

const Article: React.FC<Props> = (props) => {
  return (
    <Layout baseUrl="admin">
      <div>文章管理</div>
    </Layout>
  );
};

export default Article;
