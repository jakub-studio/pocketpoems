import { useContext } from "react";
import { SettingsOverlayContext } from "./Contexts";

export default function useSettingsOverlay () {
	return useContext(SettingsOverlayContext);
}