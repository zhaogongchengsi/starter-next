import Link from "next/link";

export default function HomePage() {
  return (
    <div className="app-container w-full h-screen">
      <div className="container mx-auto flex flex-col gap-10 items-center">
        <h1 className="text-10 text-slate-700 dark:text-white text-center">Home</h1>
        <Link className="text-2xl text-#333 hover:text-blue" href="/auth/login">
          登录
        </Link>
      </div>
    </div>
  );
}
