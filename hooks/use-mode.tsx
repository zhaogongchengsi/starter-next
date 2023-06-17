import { Dispatch, SetStateAction, useContext } from "react";
import { ModeContext } from "../contexts/mode";

export default function useMode(): [boolean, Dispatch<SetStateAction<boolean>>] {
	return useContext(ModeContext)
}
