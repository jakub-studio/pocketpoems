import React from "react";
import Poems from "../data/poems";

interface SOContextType {
	open: boolean;
	setOpen: (open: boolean) => void;
}

const PoemsContext = React.createContext<typeof Poems>(null);
const SettingsOverlayContext = React.createContext<SOContextType>({open: false, setOpen: () => void 0});

PoemsContext.displayName = "PoemsContext";
SettingsOverlayContext.displayName = "SettingsOverlayContext"

export { PoemsContext, SettingsOverlayContext };