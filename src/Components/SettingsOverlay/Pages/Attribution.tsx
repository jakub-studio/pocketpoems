import React from "react";
import styles from "./styles.css";
import classnames from "classnames";
import AttribData from "../../../data/attribution";

function List(props: { title: string, children: string | JSX.Element | JSX.Element[] }) {
	return <React.Fragment>
		<div className={classnames(styles.subtext, styles.smallcaps)}>{props.title}</div>
		<div className={styles.desc}>
			{props.children}
		</div>
		<br />
	</React.Fragment>
}

export default function Info() {
	return <div className={classnames(styles.flexDown, styles.page, styles.centre)}>
		<div className={styles.page_header}>Attribution</div>
		<List title="Image Sources (Primary)">
		{AttribData.primary.map(name => (
				<React.Fragment>
					{name} <br />
				</React.Fragment>
			))}
		</List>
		<List title="Photo Models">
			My Sister ❤
		</List>
		<List title="Image Sources (Secondary / External)">
		{AttribData.secondary.map(name => (
				<React.Fragment>
					{name} <br />
				</React.Fragment>
			))}
		</List>
	</div>
}