import React from "react";
import type { GetServerSideProps } from "next";
export interface Props {}

const Blog: React.FC<Props> = (props) => {
  return (
    <div className="app-container w-full h-screen">
      <h1 className="text-10 text-slate-700 dark:text-white text-center">Home</h1>
    </div>
  );
};

export default Blog;
