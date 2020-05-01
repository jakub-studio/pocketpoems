import React from "react";
import { SettingsOverlayContext } from "../../Hooks/Contexts";

interface ProviderProps {
	children: JSX.Element[];
}

// yoinked from https://stackoverflow.com/questions/41030361/how-to-update-react-context-from-inside-a-child-component
export default function SettingsOverlayProvider (props: ProviderProps) {
	const setOpen = (open: boolean) => {
		setState({ ...state, open })
	}

	const initState = {
		open: false,
		setOpen
	}

	const [state, setState] = React.useState(initState)

	return (
		<SettingsOverlayContext.Provider value={state}>
			{props.children}
		</SettingsOverlayContext.Provider>
	)
}