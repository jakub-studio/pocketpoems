import React from "react";
import styles from "./styles.css";

const icons = {
	Arrow,
	Info,
	Close
}

interface IconBaseProps {
	size: string;
	color?: string;
}

interface IconComponentProps extends IconBaseProps {
	icon: keyof typeof icons;
	rotation?: Rotations;
	onClick?: () => void;
}

function Icon (props: IconComponentProps) {
	const IconElement = icons[props.icon];

	return <div className={styles.icon_wrapper} onClick={props.onClick} style={{transform: `rotate(${props.rotation || 0}deg)`}}> {/* Fix for safari not applying rotation */}
		<IconElement size={props.size} color={props.color}/>
	</div>
}

enum Rotations {
	UP = 0,
	RIGHT = 90,
	DOWN = 180,
	LEFT = 270
}

function Arrow (props: IconBaseProps) {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.5 11.94" width={props.size ? props.size : "12px"}>
		<polyline stroke={props.color ? props.color : "#FFFFFF7D"} fill="transparent" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3px" points="1.5 10.44 12 1.5 22 10.3" />
	</svg>
}

function Info (props: IconBaseProps) {
	return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ? props.size : "24"} height={props.size ? props.size : "24"} viewBox="0 0 24 24" fill="none" stroke={props.color ? props.color : "#FFFFFF7D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="10"/>
		<line x1="12" y1="16" x2="12" y2="12"/>
		<line x1="12" y1="8" x2="12.01" y2="8"/>
	</svg>
}

function Close (props: IconBaseProps) {
	return <svg xmlns="http://www.w3.org/2000/svg" width={props.size ? props.size : "24"} height={props.size ? props.size : "24"} viewBox="0 0 24 24" fill="none" stroke={props.color ? props.color : "#FFFFFF7D"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<circle cx="12" cy="12" r="10"/>
		<line x1="15" y1="9" x2="9" y2="15"/>
		<line x1="9" y1="9" x2="15" y2="15"/>
	</svg>
}

Icon.Rotations = Rotations;

export default Icon;