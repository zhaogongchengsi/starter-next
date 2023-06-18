import useMode from "@/hooks/use-mode"


const AdminHeader = () => {

	const [ mode, setMode ] = useMode()

	return <header>header <button onClick={() => setMode(!mode)} >mode</button> </header>
}

export default AdminHeader