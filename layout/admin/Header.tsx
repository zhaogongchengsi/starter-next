import useMode from "@/hooks/use-mode";

const AdminHeader = () => {
  const [mode, setMode] = useMode();

  return (
    <header className="h-[--admin-header-height] flex justify-between px-3 items-center">
      <div className="w-5 h-5 i-tabler-arrows-left" />
      <button onClick={() => setMode(!mode)}>
        <div className="w-5 h-5 i-tabler-sun dark:i-tabler-moon" />
      </button>
    </header>
  );
};

export default AdminHeader;
