import React from "react";
import type { GetServerSideProps } from "next";
import { Button, buttonVariants } from "@/components/ui/button";

export interface Props {}

const Blog: React.FC<Props> = (props) => {
  return (
    <div className="page">
      <Button className={buttonVariants({ variant: "outline" })}> Public Feed </Button>
      123
    </div>
  );
};

export default Blog;
