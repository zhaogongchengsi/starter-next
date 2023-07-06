"use client";
import Layout from "@/layout/admin";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Article: React.FC<Props> = () => {
  return (
    <Layout baseUrl="admin">
      <div>文章管理</div>
    </Layout>
  );
};

export default Article;
