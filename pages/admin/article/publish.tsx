import Layout from "@/layout/admin";
import Editor from "@/components/editor"

export interface Props {}

const Publish: React.FC<Props> = () => {
  return (
    <Layout>
      <div>
		<Editor />
	  </div>
    </Layout>
  );
};

export default Publish;
