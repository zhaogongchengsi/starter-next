import Layout from "@/layout/admin";
import dynamic from "next/dynamic";

const BaseEditor = dynamic(() => import("@/components/editor").then((mod) => mod), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col gap-8 items-center justify-center">
      <h3 className="text-2xl">编辑器加载中</h3>
      <span className="animate-spin i-tabler-fidget-spinner w-15 h-15"></span>
    </div>
  ),
});

export interface Props {}

const Publish: React.FC<Props> = () => {
  return (
    <Layout>
      <div className="w-full h-full flex flex-col p-3 gap-2">
        <div className="w-full h-10">123</div>
        <div className="w-full flex-1">
          <BaseEditor  />
        </div>
      </div>
    </Layout>
  );
};

export default Publish;
