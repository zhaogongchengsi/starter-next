import useMode from "@/hooks/use-mode"


const AdminHeader = () => {

	const [ mode, setMode ] = useMode()

	return <header className="h-[--admin-header-height] flex justify-between">  <button onClick={() => setMode(!mode)} >mode</button> </header>
}

export default AdminHeader