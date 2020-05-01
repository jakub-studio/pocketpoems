import React from "react";
import styles from "./styles.css";
import HomePageScroller from "../HomePageScroller";
import Poems from "../../data/poems";
import { PoemsContext } from "../../Hooks/Contexts";
import SettingsOverlay, { SettingsOverlayProvider } from "../SettingsOverlay";
import scrollSnapPolyfill from "css-scroll-snap-polyfill";
import smoothscroll from "smoothscroll-polyfill";
import "./css-reset.css";
import "./global-styles.css"

export default class App extends React.Component {
	componentDidCatch (error, errorInfo) {
		console.error(error, errorInfo);
	}
	componentDidMount () {
		scrollSnapPolyfill();
		smoothscroll.polyfill();
	}
	render () {
		return <div className={styles.app}>
			<PoemsContext.Provider value={Poems}>
				<SettingsOverlayProvider>
					<HomePageScroller />
					<SettingsOverlay />
				</SettingsOverlayProvider>
			</PoemsContext.Provider>
		</div>
	}
}

