import { useContext } from "react";
import { PoemsContext } from "./Contexts";
import hooksConsole from "./log";

const usePoemsConsole = hooksConsole.extend("usePoems");

export default function usePoems () {
	const ctx = useContext(PoemsContext);
	// usePoemsConsole.log("Call, result: ", ctx)
	return ctx;
}