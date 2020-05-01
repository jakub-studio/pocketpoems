import React from "react";
import styles from "./styles.css";
import { useSpring, animated } from "react-spring";

interface TitleDisplayProps {
	poem: App.Poem,
	toggle: boolean
}

export default function TitleDisplay (props: TitleDisplayProps) {
	const spring = useSpring({transform: `translate(${!props.toggle ? "0" : "-215"}px, 0px)`})

	return <animated.div style={spring} className={styles.title_display}>
		<Author>{props.poem.author}</Author>
		<Title>{props.poem.name}</Title>
		<ReadBtn />
	</animated.div>
}

interface StringProps {
	children: string
}

function Author (props: StringProps) {
	return <div className={styles.subtext}>
		{props.children}
	</div>
}

function Title (props: StringProps) {
	return <div className={styles.title}>
		{props.children.split(" ").map(word => (
			<React.Fragment key={word}>
				{word} 
				<br />
			</React.Fragment>
		))}
	</div>
}

function ReadBtn () {
	return <div className={styles.btn_container}>
		<div className={styles.btn_decor}/>
		<div className={styles.subtext}>Tap to Read</div>
	</div>
}