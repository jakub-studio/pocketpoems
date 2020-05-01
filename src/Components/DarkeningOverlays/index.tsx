import React from "react";
import Constants from "../../constants";
import classnames from "classnames";
import styles from "./styles.css";
import { useSpring, animated } from "react-spring";

interface OverlayProps {
	children: JSX.Element | JSX.Element[];
}

interface MainOverlayProps extends OverlayProps {
	extraDarken: boolean
}

function MainOverlay (props: MainOverlayProps) {
	const spring = useSpring({backgroundColor: `rgba(0,0,0,${props.extraDarken ? Constants.DARKENING_LEVELS.ENABLED : Constants.DARKENING_LEVELS.DISABLED})`});

	return <animated.div style={spring} className={Constants.GLOBAL_CLASSNAMES.COVER}>
		{props.children}
	</animated.div>
};

function UpperOverlay (props: OverlayProps) {
	return <div className={classnames(styles.gradient_overlay, styles.upper)}>
		{props.children}
	</div>
}

function LowerOverlay (props: OverlayProps) {
	return <div className={classnames(styles.gradient_overlay, styles.lower)}>
		{props.children}
	</div>
}

export {
	MainOverlay,
	UpperOverlay,
	LowerOverlay
}