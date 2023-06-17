import React from "react";
import type { GetServerSideProps } from "next";
import Layout from "@/layout/default";
import Post, { PostProps } from "../components/Post";
import prisma from "../lib/prisma";
import { Button, buttonVariants } from "@/components/ui/button";

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    props: { feed },
  };
};

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <div className="page">
      <Button className={buttonVariants({ variant: "outline" })}> Public Feed </Button>
      123
    </div>
  );
};

export default Blog;
