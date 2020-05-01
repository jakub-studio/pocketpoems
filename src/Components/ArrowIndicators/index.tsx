import React from "react";
import styles from "./styles.css";
import Icon from "../Icon";
import { useSpring, animated } from "react-spring";

function ArrowIndicator(props: {
	direction: keyof typeof Icon.Rotations,
	children: string,
	onClick: () => void;
	show: boolean;
}) {
	const spring = useSpring({transform: props.show ? `translate(0px, 0px)` : `translate(0px, ${(props.direction === "UP" ? -50 : 50)}px)`});

	return <animated.div style={spring} className={styles.arrow_indicator} onClick={props.onClick}>
		{props.direction === "UP" ?
			<React.Fragment>
				<Icon icon="Arrow" size="12px" rotation={Icon.Rotations.UP}/>
				<div className={styles.text}>{props.children}</div>
			</React.Fragment>
			:
			<React.Fragment>
				<div className={styles.text}>{props.children}</div>
				<Icon icon="Arrow" size="12px" rotation={Icon.Rotations.DOWN}/>
			</React.Fragment>
		}
	</animated.div>
}

export {
	ArrowIndicator
}