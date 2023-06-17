"use client";
import useMode from "@/hooks/use-mode";

const Login = () => {

  const [md, smd]  = useMode()

  const setMode = () => {
    smd(!md);
  };

  return (
    <section className="w-full h-screen dark:text-white dark:bg-black">
      <h1>login</h1>
      <button onClick={setMode}>set mode</button>
    </section>
  );
}

export default Login
